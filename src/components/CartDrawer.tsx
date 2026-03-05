import { useCart } from "@/context/cart-context";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const C = {
  brand: "#55b685",
  brandDark: "#3d8a63",
  brandLight: "#d6f0e3",
  brandUltraLight: "#eef8f2",
  cream: "#faf9f6",
  dark: "#1e1e1e",
  gold: "#c9a96e",
  textMuted: "#6b7c72",
  white: "#ffffff",
};
const ff = "'Space Grotesk', 'Inter', sans-serif";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.45)",
          zIndex: 9998,
          animation: "cart-fade-in .2s ease-out",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(420px, 92vw)",
          background: C.cream,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          fontFamily: ff,
          animation: "cart-slide-in .25s ease-out",
          boxShadow: "-8px 0 32px rgba(0,0,0,.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: `1px solid ${C.brandLight}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingBag size={20} color={C.dark} />
            <span style={{ fontSize: 18, fontWeight: 700, color: C.dark }}>
              Your Cart
            </span>
            {totalItems > 0 && (
              <span
                style={{
                  background: C.brand,
                  color: C.white,
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 20,
                  padding: "2px 10px",
                }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={22} color={C.dark} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 16,
                color: C.textMuted,
              }}
            >
              <ShoppingBag size={48} strokeWidth={1.2} />
              <p style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Your cart is empty</p>
              <button
                onClick={() => {
                  closeCart();
                  navigate("/products");
                }}
                style={{
                  marginTop: 8,
                  padding: "12px 28px",
                  background: C.dark,
                  color: C.white,
                  border: "none",
                  borderRadius: 30,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: ff,
                  cursor: "pointer",
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: 14,
                    background: C.white,
                    borderRadius: 16,
                    border: `1px solid ${C.brandLight}`,
                  }}
                >
                  {/* Image */}
                  <div
                    onClick={() => {
                      closeCart();
                      navigate(`/products/${item.id}`);
                    }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      background: C.brandUltraLight,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: C.dark,
                          margin: 0,
                          lineHeight: 1.3,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          closeCart();
                          navigate(`/products/${item.id}`);
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.dark, margin: "4px 0 0" }}>
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0,
                          border: `1px solid ${C.brandLight}`,
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          style={{
                            width: 32,
                            height: 32,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Minus size={14} color={C.dark} />
                        </button>
                        <span
                          style={{
                            width: 32,
                            textAlign: "center",
                            fontSize: 13,
                            fontWeight: 600,
                            color: C.dark,
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          style={{
                            width: 32,
                            height: 32,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Plus size={14} color={C.dark} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 4,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 8,
                        }}
                      >
                        <Trash2 size={16} color="#e74c3c" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: `1px solid ${C.brandLight}`,
              background: C.white,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: C.textMuted }}>Subtotal</span>
              <span style={{ fontSize: 14, color: C.dark, fontWeight: 600 }}>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {subtotal < 999 && (
              <p style={{ fontSize: 12, color: C.brand, margin: "0 0 12px", fontWeight: 500 }}>
                Add ₹{(999 - subtotal).toLocaleString("en-IN")} more for free shipping!
              </p>
            )}
            {subtotal >= 999 && (
              <p style={{ fontSize: 12, color: C.brand, margin: "0 0 12px", fontWeight: 500 }}>
                ✓ You qualify for free shipping!
              </p>
            )}
            <button
              style={{
                width: "100%",
                padding: "14px 0",
                background: C.brand,
                color: C.white,
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: ff,
                cursor: "pointer",
                transition: "background .2s",
                letterSpacing: ".3px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.brandDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.brand;
              }}
            >
              Checkout — ₹{subtotal.toLocaleString("en-IN")}
            </button>
            <button
              onClick={() => {
                closeCart();
                navigate("/products");
              }}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "12px 0",
                background: "transparent",
                color: C.dark,
                border: `1.5px solid ${C.brandLight}`,
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: ff,
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes cart-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes cart-fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
};

export default CartDrawer;
