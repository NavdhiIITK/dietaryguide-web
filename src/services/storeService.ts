import { db } from "@/lib/firebase";
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection,
  addDoc, getDocs, query, where, orderBy, serverTimestamp, Timestamp
} from "firebase/firestore";
import type { PaymentResult } from "@/services/paymentService";

/** Firestore can transiently return permission-denied on the very first
 * request right after sign-up/sign-in while the ID token is still
 * propagating to the SDK's request pipeline. One short retry clears it. */
async function withAuthRetry<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    if (err?.code === "permission-denied") {
      await new Promise((r) => setTimeout(r, 800));
      try {
        return await fn();
      } catch (err2) {
        console.error("withAuthRetry: retry also failed:", err2);
        return fallback;
      }
    }
    console.error("withAuthRetry error:", err);
    return fallback;
  }
}

/* ── Profile ───────────────────────────────────────────────── */

export interface UserProfile {
  uid: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  photoURL: string | null;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
  } | null;
  createdAt?: any;
  updatedAt?: any;
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return null;
    return { uid, ...snap.data() } as UserProfile;
  } catch (err) {
    console.error("getProfile error:", err);
    return null;
  }
}

/** Create a user document if it doesn't already exist */
export async function ensureUserDoc(uid: string, data: { name?: string | null; email?: string | null; photoURL?: string | null }): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid,
        name: data.name ?? null,
        email: data.email ?? null,
        phone: null,
        photoURL: data.photoURL ?? null,
        address: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (err) {
    console.error("ensureUserDoc error:", err);
  }
}

export async function updateProfile(uid: string, fields: Partial<Omit<UserProfile, "uid" | "createdAt">>): Promise<void> {
  try {
    await updateDoc(doc(db, "users", uid), { ...fields, updatedAt: serverTimestamp() });
  } catch (err) {
    console.error("updateProfile error:", err);
  }
}

/* ── Orders ────────────────────────────────────────────────── */

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string | null;
  price: number;
  quantity: number;
}

export interface StoreOrder {
  orderId: string;
  userId: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentId?: string;
  subtotal: number;
  shipping: number;
  totalAmount: number;
  shippingAddress: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    addressLine2?: string;
    city: string;
    district?: string;
    state: string;
    country?: string;
    pincode: string;
    addressType?: string;
    deliveryInstructions?: string;
  };
  items: OrderItem[];
  createdAt?: any;
}

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DG-${ts}-${rand}`;
}

export async function createOrder(
  uid: string,
  cartItems: { id: string; name: string; price: number; image: string; quantity: number }[],
  shippingInfo: StoreOrder["shippingAddress"],
  payment: PaymentResult
): Promise<StoreOrder | null> {
  try {
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 49;
    const totalAmount = subtotal + shipping;
    const orderNumber = generateOrderNumber();

    const items: OrderItem[] = cartItems.map((i) => ({
      productId: i.id,
      productName: i.name,
      productImage: i.image,
      price: i.price,
      quantity: i.quantity,
    }));

    const orderData = {
      userId: uid,
      orderNumber,
      orderStatus: "confirmed",
      paymentStatus: payment.status,
      paymentMethod: payment.method,
      ...(payment.paymentId ? { paymentId: payment.paymentId } : {}),
      subtotal,
      shipping,
      totalAmount,
      shippingAddress: shippingInfo,
      items,
      createdAt: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "orders"), orderData);

    return { orderId: ref.id, ...orderData, createdAt: new Date().toISOString() } as StoreOrder;
  } catch (err) {
    console.error("createOrder error:", err);
    return null;
  }
}

export async function getOrders(uid: string): Promise<StoreOrder[]> {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        orderId: d.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
      } as StoreOrder;
    });
  } catch (err) {
    console.error("getOrders error:", err);
    return [];
  }
}

/* ── Cart (users/{uid}/cart/{productId}) ───────────────────── */

export interface FirestoreCartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export async function loadCartFromFirestore(uid: string): Promise<FirestoreCartItem[]> {
  return withAuthRetry(async () => {
    const snap = await getDocs(collection(db, "users", uid, "cart"));
    return snap.docs.map((d) => ({ productId: d.id, ...d.data() } as FirestoreCartItem));
  }, []);
}

export async function saveCartItemToFirestore(uid: string, item: { id: string; name: string; price: number; image: string; quantity: number }): Promise<void> {
  return withAuthRetry(async () => {
    await setDoc(doc(db, "users", uid, "cart", item.id), {
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    });
  }, undefined);
}

export async function removeCartItemFromFirestore(uid: string, itemId: string): Promise<void> {
  return withAuthRetry(async () => {
    await deleteDoc(doc(db, "users", uid, "cart", itemId));
  }, undefined);
}

export async function clearCartFromFirestore(uid: string): Promise<void> {
  return withAuthRetry(async () => {
    const snap = await getDocs(collection(db, "users", uid, "cart"));
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  }, undefined);
}
