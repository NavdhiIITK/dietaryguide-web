import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { getProfile, updateProfile as updateUserProfile, getOrders, UserProfile, StoreOrder } from "@/services/storeService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Package, MapPin, ChevronRight, ArrowLeft, Camera, Save, Loader2 } from "lucide-react";

const C = {
  brand: "#55b685", brandDark: "#3d8a63", brandLight: "#d6f0e3", brandUltraLight: "#eef8f2",
  cream: "#faf9f6", dark: "#1e1e1e", gold: "#c9a96e", textMuted: "#6b7c72", white: "#ffffff",
};
const ff = "'Space Grotesk', 'Inter', sans-serif";

type Tab = "profile" | "orders" | "address";

export default function StoreAccountPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "profile";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Form fields
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/products");
  }, [user, navigate]);

  // Load profile
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingProfile(true);
      const p = await getProfile(user.uid);
      if (p) {
        setProfile(p);
        setDisplayName(p.name || user.displayName || "");
        setPhone(p.phone || "");
        setAddressLine1(p.address?.line1 || "");
        setAddressLine2(p.address?.line2 || "");
        setCity(p.address?.city || "");
        setState(p.address?.state || "");
        setPincode(p.address?.pincode || "");
      } else {
        setDisplayName(user.displayName || "");
      }
      setLoadingProfile(false);
    })();
  }, [user]);

  // Load orders
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingOrders(true);
      const o = await getOrders(user.uid);
      setOrders(o);
      setLoadingOrders(false);
    })();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    setSaveMsg("");
    await updateUserProfile(user.uid, {
      name: displayName,
      email: user.email,
      phone,
      photoURL: user.photoURL,
    });
    setSaving(false);
    setSaveMsg("Profile saved!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleSaveAddress = async () => {
    if (!user) return;
    setSaving(true);
    setSaveMsg("");
    await updateUserProfile(user.uid, {
      name: displayName || user.displayName,
      phone,
      address: {
        line1: addressLine1,
        line2: addressLine2,
        city,
        state,
        pincode,
      },
    });
    setSaving(false);
    setSaveMsg("Address saved!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  if (!user) return null;

  const tabs: { key: Tab; label: string; icon: typeof User }[] = [
    { key: "profile", label: "Profile", icon: User },
    { key: "orders", label: "Orders", icon: Package },
    { key: "address", label: "Address", icon: MapPin },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: `1.5px solid ${C.brandLight}`,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: ff,
    outline: "none",
    boxSizing: "border-box",
    background: C.white,
    transition: "border-color .2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: C.dark,
    marginBottom: 4,
    display: "block",
  };

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch { return d; }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "confirmed": return { bg: "#e8f5e9", color: "#2e7d32" };
      case "processing": return { bg: "#fff8e1", color: "#f9a825" };
      case "shipped": return { bg: "#e3f2fd", color: "#1565c0" };
      case "delivered": return { bg: "#e8f5e9", color: "#1b5e20" };
      case "cancelled": return { bg: "#fce4ec", color: "#c62828" };
      default: return { bg: C.brandUltraLight, color: C.brand };
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: ff }}>
      <Navbar />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "100px 16px 60px" }}>
        {/* Back link */}
        <button
          onClick={() => navigate("/products")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, color: C.brand, fontWeight: 600, fontFamily: ff,
            marginBottom: 24, padding: 0,
          }}
        >
          <ArrowLeft size={16} /> Back to Store
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            background: C.brandLight, display: "flex", alignItems: "center", justifyContent: "center",
            border: `3px solid ${C.brand}`,
          }}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
            ) : (
              <span style={{ fontSize: 24, fontWeight: 700, color: C.brand }}>
                {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.dark, margin: 0 }}>
              {user.displayName || "Your Account"}
            </h1>
            <p style={{ fontSize: 13, color: C.textMuted, margin: "2px 0 0" }}>{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${C.brandLight}`, marginBottom: 32 }}>
          {tabs.map((t) => {
            const active = activeTab === t.key;
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 20px",
                  fontSize: 14, fontWeight: active ? 700 : 500,
                  color: active ? C.brand : C.textMuted,
                  background: "none", border: "none",
                  borderBottom: active ? `2.5px solid ${C.brand}` : "2.5px solid transparent",
                  cursor: "pointer", fontFamily: ff,
                  transition: "all .2s", marginBottom: -2,
                }}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={{ maxWidth: 480 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 20 }}>Personal Information</h2>
            {loadingProfile ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textMuted }}>
                <Loader2 size={18} className="animate-spin" /> Loading...
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input style={inputStyle} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input style={{ ...inputStyle, background: "#f5f5f5", color: C.textMuted }} value={user.email || ""} disabled />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
                {saveMsg && <p style={{ fontSize: 13, color: C.brand, margin: 0 }}>{saveMsg}</p>}
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px 24px", background: C.brand, color: C.white,
                    border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
                    fontFamily: ff, cursor: saving ? "wait" : "pointer",
                    opacity: saving ? 0.7 : 1, transition: "background .2s",
                    alignSelf: "flex-start",
                  }}
                >
                  <Save size={16} /> {saving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 20 }}>Your Orders</h2>
            {loadingOrders ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textMuted }}>
                <Loader2 size={18} className="animate-spin" /> Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "48px 20px",
                background: C.white, borderRadius: 16, border: `1px solid ${C.brandLight}`,
              }}>
                <Package size={48} color={C.brandLight} style={{ marginBottom: 12 }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 4 }}>No orders yet</h3>
                <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 16px" }}>When you place your first order, it will appear here.</p>
                <button
                  onClick={() => navigate("/products")}
                  style={{
                    padding: "10px 24px", background: C.brand, color: C.white,
                    border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600,
                    fontFamily: ff, cursor: "pointer",
                  }}
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {orders.map((order) => {
                  const sc = statusColor(order.orderStatus);
                  return (
                    <div
                      key={order.orderId}
                      style={{
                        background: C.white, borderRadius: 16,
                        border: `1px solid ${C.brandLight}`,
                        overflow: "hidden",
                      }}
                    >
                      {/* Order header */}
                      <div style={{
                        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center",
                        padding: "14px 20px", background: C.brandUltraLight,
                        borderBottom: `1px solid ${C.brandLight}`, gap: 8,
                      }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{order.orderNumber}</span>
                          <span style={{ fontSize: 11, color: C.textMuted }}>
                            {order.createdAt ? formatDate(order.createdAt) : ""}
                          </span>
                        </div>
                        <span style={{
                          fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                          padding: "4px 12px", borderRadius: 20,
                          background: sc.bg, color: sc.color, letterSpacing: ".5px",
                        }}>
                          {order.orderStatus}
                        </span>
                      </div>

                      {/* Order items */}
                      <div style={{ padding: "16px 20px" }}>
                        {(order.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex", gap: 12, alignItems: "center",
                              padding: "8px 0",
                              borderBottom: idx < (order.items?.length || 0) - 1 ? `1px solid ${C.brandLight}` : "none",
                            }}
                          >
                            {item.productImage && (
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                style={{ width: 52, height: 52, borderRadius: 8, objectFit: "cover", flexShrink: 0, border: `1px solid ${C.brandLight}` }}
                              />
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {item.productName}
                              </p>
                              <p style={{ fontSize: 12, color: C.textMuted, margin: "2px 0 0" }}>
                                Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                              </p>
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, flexShrink: 0 }}>
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order footer */}
                      <div style={{
                        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start",
                        padding: "14px 20px", background: C.brandUltraLight,
                        borderTop: `1px solid ${C.brandLight}`, gap: 12,
                      }}>
                        <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>
                          {order.shippingAddress?.name && <div><strong>Ship to:</strong> {order.shippingAddress.name}</div>}
                          {order.shippingAddress?.address && <div>{order.shippingAddress.address}</div>}
                          {(order.shippingAddress?.city || order.shippingAddress?.state) && (
                            <div>{[order.shippingAddress.city, order.shippingAddress.state, order.shippingAddress.pincode].filter(Boolean).join(", ")}</div>
                          )}
                          {order.shippingAddress?.phone && <div>Phone: {order.shippingAddress.phone}</div>}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 12, color: C.textMuted }}>
                            Subtotal: ₹{order.subtotal.toLocaleString("en-IN")}
                          </div>
                          <div style={{ fontSize: 12, color: C.textMuted }}>
                            Shipping: {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
                          </div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginTop: 4 }}>
                            Total: ₹{order.totalAmount.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Address Tab */}
        {activeTab === "address" && (
          <div style={{ maxWidth: 480 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 20 }}>Shipping Address</h2>
            {loadingProfile ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textMuted }}>
                <Loader2 size={18} className="animate-spin" /> Loading...
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Address Line 1</label>
                  <input style={inputStyle} value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="House/Flat No, Building, Street" />
                </div>
                <div>
                  <label style={labelStyle}>Address Line 2</label>
                  <input style={inputStyle} value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Landmark, Area (Optional)" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input style={inputStyle} value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <input style={inputStyle} value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                  </div>
                </div>
                <div style={{ maxWidth: 200 }}>
                  <label style={labelStyle}>Pincode</label>
                  <input style={inputStyle} value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="XXXXXX" maxLength={6} />
                </div>
                {saveMsg && <p style={{ fontSize: 13, color: C.brand, margin: 0 }}>{saveMsg}</p>}
                <button
                  onClick={handleSaveAddress}
                  disabled={saving}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px 24px", background: C.brand, color: C.white,
                    border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
                    fontFamily: ff, cursor: saving ? "wait" : "pointer",
                    opacity: saving ? 0.7 : 1, transition: "background .2s",
                    alignSelf: "flex-start",
                  }}
                >
                  <Save size={16} /> {saving ? "Saving..." : "Save Address"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
