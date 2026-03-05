import { supabase } from "@/lib/supabase-client";

/* ── Profile ───────────────────────────────────────────────── */

export interface StoreProfile {
  id?: string;
  firebase_uid: string;
  display_name: string | null;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function getProfile(uid: string): Promise<StoreProfile | null> {
  const { data, error } = await supabase
    .from("store_profiles")
    .select("*")
    .eq("firebase_uid", uid)
    .maybeSingle();
  if (error) { console.error("getProfile error:", error); return null; }
  return data;
}

export async function upsertProfile(profile: Partial<StoreProfile> & { firebase_uid: string }): Promise<StoreProfile | null> {
  const { data, error } = await supabase
    .from("store_profiles")
    .upsert(profile, { onConflict: "firebase_uid" })
    .select()
    .single();
  if (error) { console.error("upsertProfile error:", error); return null; }
  return data;
}

/* ── Orders ────────────────────────────────────────────────── */

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
}

export interface StoreOrder {
  id?: string;
  firebase_uid: string;
  order_number: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  shipping_name: string | null;
  shipping_phone: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
}

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DG-${ts}-${rand}`;
}

export async function createOrder(
  uid: string,
  cartItems: { id: string; name: string; price: number; image: string; quantity: number }[],
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  }
): Promise<StoreOrder | null> {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  const orderNumber = generateOrderNumber();

  const { data: order, error: orderErr } = await supabase
    .from("store_orders")
    .insert({
      firebase_uid: uid,
      order_number: orderNumber,
      status: "confirmed",
      subtotal,
      shipping,
      total,
      shipping_name: shippingInfo.name,
      shipping_phone: shippingInfo.phone,
      shipping_address: shippingInfo.address,
      shipping_city: shippingInfo.city,
      shipping_state: shippingInfo.state,
      shipping_pincode: shippingInfo.pincode,
    })
    .select()
    .single();

  if (orderErr || !order) {
    console.error("createOrder error:", orderErr);
    return null;
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    product_image: item.image,
    price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsErr } = await supabase
    .from("store_order_items")
    .insert(orderItems);

  if (itemsErr) {
    console.error("createOrder items error:", itemsErr);
  }

  return { ...order, items: orderItems };
}

export async function getOrders(uid: string): Promise<StoreOrder[]> {
  const { data: orders, error } = await supabase
    .from("store_orders")
    .select("*")
    .eq("firebase_uid", uid)
    .order("created_at", { ascending: false });

  if (error || !orders) {
    console.error("getOrders error:", error);
    return [];
  }

  // Fetch items for each order
  const orderIds = orders.map((o: any) => o.id);
  const { data: allItems } = await supabase
    .from("store_order_items")
    .select("*")
    .in("order_id", orderIds);

  return orders.map((o: any) => ({
    ...o,
    items: (allItems || []).filter((i: any) => i.order_id === o.id),
  }));
}
