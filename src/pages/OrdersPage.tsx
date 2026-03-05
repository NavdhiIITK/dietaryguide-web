import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { getOrders, StoreOrder } from "@/services/storeService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Package, Loader2, ShoppingBag } from "lucide-react";

const C = {
  brand: "#55b685", brandDark: "#3d8a63", brandLight: "#d6f0e3", brandUltraLight: "#eef8f2",
  cream: "#faf9f6", dark: "#1e1e1e", gold: "#c9a96e", textMuted: "#6b7c72", white: "#ffffff",
};
const ff = "'Space Grotesk', 'Inter', sans-serif";

function statusStyle(s: string): React.CSSProperties {
  const map: Record<string, { bg: string; color: string }> = {
    confirmed:  { bg: "#e8f5e9", color: "#2e7d32" },
    processing: { bg: "#fff8e1", color: "#f9a825" },
    shipped:    { bg: "#e3f2fd", color: "#1565c0" },
    delivered:  { bg: "#e8f5e9", color: "#1b5e20" },
    cancelled:  { bg: "#fce4ec", color: "#c62828" },
  };
  const t = map[s] ?? { bg: C.brandUltraLight, color: C.brand };
  return {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
    padding: "4px 12px", borderRadius: 20,
    background: t.bg, color: t.color, letterSpacing: ".5px",
    flexShrink: 0,
  };
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

function OrderCard({ order }: { order: StoreOrder }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: C.white, borderRadius: 16,
      border: `1px solid ${C.brandLight}`, overflow: "hidden",
    }}>
      {/* Header row */}
      <div
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: 10,
          padding: "14px 18px", background: C.brandUltraLight,
          cursor: "pointer", userSelect: "none",
          borderBottom: expanded ? `1px solid ${C.brandLight}` : "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{order.orderNumber}</span>
          <span style={{ fontSize: 11, color: C.textMuted }}>
            {order.createdAt ? formatDate(order.createdAt) : ""}
            {" · "}{order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? "s" : ""}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={statusStyle(order.orderStatus)}>{order.orderStatus}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.dark, whiteSpace: "nowrap" }}>
            ₹{order.totalAmount.toLocaleString("en-IN")}
          </span>
          <span style={{ fontSize: 18, color: C.textMuted, transform: expanded ? "rotate(180deg)" : "none", transition: ".2s" }}>
            ‹
          </span>
        </div>
      </div>

      {/* Expanded items */}
      {expanded && (
        <>
          <div style={{ padding: "14px 18px" }}>
            {(order.items || []).map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex", gap: 12, alignItems: "center",
                  padding: "10px 0",
                  borderBottom: idx < (order.items?.length ?? 0) - 1
                    ? `1px solid ${C.brandLight}` : "none",
                }}
              >
                {item.productImage && (
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    style={{
                      width: 50, height: 50, borderRadius: 8,
                      objectFit: "cover", flexShrink: 0,
                      border: `1px solid ${C.brandLight}`,
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.dark, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.productName}
                  </p>
                  <p style={{ fontSize: 12, color: C.textMuted, margin: "2px 0 0" }}>
                    Qty {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.dark, flexShrink: 0 }}>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start",
            padding: "12px 18px", background: C.brandUltraLight,
            borderTop: `1px solid ${C.brandLight}`, gap: 12,
          }}>
            {/* Delivery info */}
            <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
              {order.shippingAddress?.name && (
                <div><strong style={{ color: C.dark }}>Ship to:</strong> {order.shippingAddress.name}</div>
              )}
              {order.shippingAddress?.address && <div>{order.shippingAddress.address}</div>}
              {(order.shippingAddress?.city || order.shippingAddress?.state) && (
                <div>
                  {[order.shippingAddress.city, order.shippingAddress.state, order.shippingAddress.pincode]
                    .filter(Boolean).join(", ")}
                </div>
              )}
              {order.shippingAddress?.phone && <div>Phone: {order.shippingAddress.phone}</div>}
            </div>

            {/* Price breakdown */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: C.textMuted }}>
                Subtotal: ₹{order.subtotal.toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: 12, color: C.textMuted }}>
                Shipping: {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginTop: 2 }}>
                Total: ₹{order.totalAmount.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/products"); return; }
    (async () => {
      setLoading(true);
      const o = await getOrders(user.uid);
      setOrders(o);
      setLoading(false);
    })();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: ff }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "100px 16px 60px" }}>

        {/* Back */}
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, background: C.brandLight,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Package size={20} color={C.brand} />
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: C.dark, margin: 0 }}>My Orders</h1>
              {!loading && (
                <p style={{ fontSize: 13, color: C.textMuted, margin: "1px 0 0" }}>
                  {orders.length === 0 ? "No orders yet" : `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate("/products/profile")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "9px 16px", background: C.brandUltraLight,
              color: C.brand, border: `1px solid ${C.brandLight}`,
              borderRadius: 10, fontSize: 13, fontWeight: 600,
              fontFamily: ff, cursor: "pointer",
            }}
          >
            Edit Profile →
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "60px 0", color: C.textMuted }}>
            <Loader2 size={20} className="animate-spin" /> Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "56px 24px",
            background: C.white, borderRadius: 20,
            border: `1px solid ${C.brandLight}`,
          }}>
            <ShoppingBag size={52} color={C.brandLight} style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 8 }}>No orders yet</h3>
            <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24 }}>
              Your order history will appear here once you place your first order.
            </p>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "12px 28px", background: C.brand, color: C.white,
                border: "none", borderRadius: 12, fontSize: 14,
                fontWeight: 700, fontFamily: ff, cursor: "pointer",
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {orders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
