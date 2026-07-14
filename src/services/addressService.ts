import { db } from "@/lib/firebase";
import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  writeBatch, serverTimestamp, Timestamp, query, orderBy,
} from "firebase/firestore";
import { Address, AddressInput } from "@/types/address";

function addressesRef(uid: string) {
  return collection(db, "users", uid, "addresses");
}

function normalize(id: string, data: any): Address {
  return {
    id,
    fullName: data.fullName || "",
    phone: data.phone || "",
    email: data.email || undefined,
    houseNumber: data.houseNumber || "",
    building: data.building || undefined,
    street: data.street || "",
    area: data.area || "",
    landmark: data.landmark || undefined,
    village: data.village || undefined,
    city: data.city || "",
    district: data.district || undefined,
    state: data.state || "",
    country: data.country || "India",
    pincode: data.pincode || "",
    addressType: data.addressType || "Home",
    nickname: data.nickname || undefined,
    deliveryInstructions: data.deliveryInstructions || undefined,
    isDefault: !!data.isDefault,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
  };
}

export async function getAddresses(uid: string): Promise<Address[]> {
  try {
    const snap = await getDocs(query(addressesRef(uid), orderBy("createdAt", "desc")));
    const addresses = snap.docs.map((d) => normalize(d.id, d.data()));
    // Default address always floats to the top regardless of createdAt.
    addresses.sort((a, b) => (a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1));
    return addresses;
  } catch (err) {
    console.error("getAddresses error:", err);
    return [];
  }
}

async function clearExistingDefault(uid: string, exceptId?: string) {
  const snap = await getDocs(addressesRef(uid));
  const batch = writeBatch(db);
  let touched = false;
  snap.docs.forEach((d) => {
    if (d.id !== exceptId && d.data().isDefault) {
      batch.update(d.ref, { isDefault: false });
      touched = true;
    }
  });
  if (touched) await batch.commit();
}

export async function addAddress(uid: string, input: AddressInput): Promise<Address> {
  const existing = await getDocs(addressesRef(uid));
  const isFirstAddress = existing.empty;
  const shouldBeDefault = isFirstAddress || input.isDefault;

  if (shouldBeDefault) await clearExistingDefault(uid);

  const ref = await addDoc(addressesRef(uid), {
    ...input,
    isDefault: shouldBeDefault,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const saved = await getDoc(ref);
  return normalize(saved.id, saved.data());
}

export async function updateAddress(uid: string, addressId: string, patch: Partial<AddressInput>): Promise<Address> {
  if (patch.isDefault) await clearExistingDefault(uid, addressId);
  const ref = doc(db, "users", uid, "addresses", addressId);
  await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
  const saved = await getDoc(ref);
  return normalize(saved.id, saved.data());
}

export async function deleteAddress(uid: string, addressId: string): Promise<void> {
  const ref = doc(db, "users", uid, "addresses", addressId);
  const snap = await getDoc(ref);
  const wasDefault = snap.exists() && snap.data().isDefault;
  await deleteDoc(ref);

  if (wasDefault) {
    const remaining = await getDocs(addressesRef(uid));
    const next = remaining.docs[0];
    if (next) await updateDoc(next.ref, { isDefault: true, updatedAt: serverTimestamp() });
  }
}

export async function setDefaultAddress(uid: string, addressId: string): Promise<void> {
  await clearExistingDefault(uid, addressId);
  await updateDoc(doc(db, "users", uid, "addresses", addressId), { isDefault: true, updatedAt: serverTimestamp() });
}
