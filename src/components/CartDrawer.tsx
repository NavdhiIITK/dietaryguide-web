import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
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
  const { user, signInWithGoogle, signInWithMicrosoft } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
              onClick={() => {
                if (!user) {
                  setShowLoginPrompt(true);
                  return;
                }
                // User is logged in — proceed to checkout (no payment gateway yet)
                closeCart();
              }}
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

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <>
          <div
            onClick={() => setShowLoginPrompt(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.55)",
              zIndex: 10001,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10002,
              background: C.white,
              borderRadius: 20,
              padding: "36px 32px 32px",
              width: "min(400px, 90vw)",
              boxShadow: "0 20px 60px rgba(0,0,0,.18)",
              fontFamily: ff,
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setShowLoginPrompt(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <X size={20} color={C.textMuted} />
            </button>

            <ShoppingBag size={36} color={C.brand} style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>
              Sign in to continue
            </h3>
            <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 28px", lineHeight: 1.6 }}>
              Please sign in to proceed to checkout. Your cart will be saved.
            </p>

            <button
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  setShowLoginPrompt(false);
                } catch { /* handled in context */ }
              }}
              style={{
                width: "100%",
                padding: "13px 0",
                background: C.white,
                color: C.dark,
                border: `1.5px solid ${C.brandLight}`,
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: ff,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "background .2s",
                marginBottom: 10,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.brandUltraLight; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.white; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            <button
              onClick={async () => {
                try {
                  await signInWithMicrosoft();
                  setShowLoginPrompt(false);
                } catch { /* handled in context */ }
              }}
              style={{
                width: "100%",
                padding: "13px 0",
                background: C.white,
                color: C.dark,
                border: `1.5px solid ${C.brandLight}`,
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: ff,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "background .2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.brandUltraLight; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.white; }}
            >
              <svg width="18" height="18" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
              Continue with Microsoft
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CartDrawer;
