import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { X, Plus, Minus, ShoppingBag, Trash2, Eye, EyeOff, Loader2, CheckCircle, MapPin, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/services/storeService";
import { processPayment, PAYMENT_STATUS_LABELS } from "@/services/paymentService";
import { Address, AddressInput, formatAddressLine } from "@/types/address";
import { getAddresses, addAddress, updateAddress, deleteAddress } from "@/services/addressService";
import { auth } from "@/lib/firebase";
import AddressCard from "@/components/address/AddressCard";
import AddressForm from "@/components/address/AddressForm";

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

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "US/Canada" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+92", country: "Pakistan" },
  { code: "+880", country: "Bangladesh" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+977", country: "Nepal" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+974", country: "Qatar" },
  { code: "+968", country: "Oman" },
  { code: "+973", country: "Bahrain" },
  { code: "+965", country: "Kuwait" },
  { code: "+60", country: "Malaysia" },
  { code: "+27", country: "South Africa" },
  { code: "+234", country: "Nigeria" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
  { code: "+31", country: "Netherlands" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+82", country: "South Korea" },
  { code: "+64", country: "New Zealand" },
  { code: "+353", country: "Ireland" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Philippines" },
  { code: "+66", country: "Thailand" },
  { code: "+84", country: "Vietnam" },
  { code: "+90", country: "Turkey" },
  { code: "+7", country: "Russia" },
];

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, subtotal, clearCart } = useCart();
  const { user, signIn, signUp, signInWithGoogle, phoneVerified, sendPhoneOtp, verifyPhoneOtp } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Phone verification
  const [showPhoneVerify, setShowPhoneVerify] = useState(false);
  const [otpCountryCode, setOtpCountryCode] = useState("+91");
  const [otpPhone, setOtpPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Checkout flow
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "review" | "success">("cart");
  const [checkoutAddresses, setCheckoutAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressFormMode, setAddressFormMode] = useState<"list" | "add" | "edit">("list");
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderPaymentStatus, setOrderPaymentStatus] = useState<string>("");

  const navigate = useNavigate();

  // Fetches the user's saved addresses and decides where to land:
  // default address -> straight to review; some addresses -> pick from list;
  // no addresses yet -> straight to the "add new" form.
  const goToAddressStep = async (uid: string) => {
    setLoadingAddresses(true);
    const list = await getAddresses(uid);
    setCheckoutAddresses(list);
    setLoadingAddresses(false);
    const def = list.find((a) => a.isDefault);
    if (def) {
      setSelectedAddress(def);
      setCheckoutStep("review");
    } else if (list.length === 0) {
      setAddressFormMode("add");
      setCheckoutStep("address");
    } else {
      setAddressFormMode("list");
      setCheckoutStep("address");
    }
  };

  const reloadCheckoutAddresses = async (uid: string) => {
    const list = await getAddresses(uid);
    setCheckoutAddresses(list);
    return list;
  };

  // Reset checkout when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setCheckoutStep("cart");
      setOrderNumber("");
      setSelectedAddress(null);
      setAddressFormMode("list");
      setEditingAddress(null);
    }
  }, [isOpen]);

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
              onClick={async () => {
                if (!user) {
                  setShowLoginPrompt(true);
                  return;
                }
                // Phone OTP verification is temporarily disabled — Firebase now
                // requires a Google Cloud billing account (reCAPTCHA Enterprise
                // migration) to send SMS. The full flow (sendPhoneOtp/verifyPhoneOtp,
                // the modal below) is still intact — re-enable by restoring the
                // `if (!phoneVerified) { setShowPhoneVerify(true); return; }` check
                // here and in the two post-login handlers below once billing (or a
                // 3rd-party SMS provider) is set up.
                await goToAddressStep(user.uid);
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

      {/* Address Step Overlay — select a saved address or add a new one */}
      {checkoutStep === "address" && user && (
        <div
          style={{
            position: "fixed",
            top: 0, right: 0, bottom: 0,
            width: "min(460px, 100vw)",
            background: C.white,
            zIndex: 10001,
            display: "flex",
            flexDirection: "column",
            fontFamily: ff,
            animation: "cart-slide-in .3s ease-out",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${C.brandLight}` }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, margin: 0 }}>
              {addressFormMode === "list" ? "Choose Delivery Address" : addressFormMode === "edit" ? "Edit Address" : "Add New Address"}
            </h3>
            <button onClick={() => setCheckoutStep("cart")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <X size={20} color={C.textMuted} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {addressFormMode === "list" ? (
              loadingAddresses ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textMuted, padding: "24px 0" }}>
                  <Loader2 size={18} className="animate-spin" /> Loading addresses…
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {checkoutAddresses.map((a) => (
                    <AddressCard
                      key={a.id}
                      address={a}
                      selected={selectedAddress?.id === a.id}
                      onSelect={() => { setSelectedAddress(a); setCheckoutStep("review"); }}
                      onEdit={() => { setEditingAddress(a); setAddressFormMode("edit"); }}
                      onDelete={async () => {
                        if (!window.confirm(`Delete the address for ${a.fullName}?`)) return;
                        await deleteAddress(user.uid, a.id);
                        await reloadCheckoutAddresses(user.uid);
                        if (selectedAddress?.id === a.id) setSelectedAddress(null);
                      }}
                    />
                  ))}
                  <button
                    onClick={() => { setEditingAddress(null); setAddressFormMode("add"); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "13px 0", background: "transparent", color: C.brand,
                      border: `1.5px dashed ${C.brand}`, borderRadius: 12, fontSize: 14, fontWeight: 700,
                      fontFamily: ff, cursor: "pointer",
                    }}
                  >
                    <Plus size={16} /> Add New Address
                  </button>
                </div>
              )
            ) : (
              <AddressForm
                initial={editingAddress || undefined}
                existingAddresses={checkoutAddresses}
                saving={savingAddress}
                onCancel={() => setAddressFormMode("list")}
                onSave={async (input: AddressInput) => {
                  setSavingAddress(true);
                  try {
                    const saved = addressFormMode === "edit" && editingAddress
                      ? await updateAddress(user.uid, editingAddress.id, input)
                      : await addAddress(user.uid, input);
                    await reloadCheckoutAddresses(user.uid);
                    setSelectedAddress(saved);
                    setAddressFormMode("list");
                    setEditingAddress(null);
                    setCheckoutStep("review");
                  } finally {
                    setSavingAddress(false);
                  }
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Review Step Overlay — confirm address, see order summary, place order */}
      {checkoutStep === "review" && user && selectedAddress && (
        <div
          style={{
            position: "fixed",
            top: 0, right: 0, bottom: 0,
            width: "min(420px, 100vw)",
            background: C.white,
            zIndex: 10001,
            display: "flex",
            flexDirection: "column",
            fontFamily: ff,
            animation: "cart-slide-in .3s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 24px", borderBottom: `1px solid ${C.brandLight}` }}>
            <button onClick={() => setCheckoutStep("cart")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <ChevronLeft size={20} color={C.textMuted} />
            </button>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, margin: 0, flex: 1 }}>Review Order</h3>
            <button onClick={() => setCheckoutStep("cart")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <X size={20} color={C.textMuted} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Selected address */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".4px" }}>
                  <MapPin size={12} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} /> Deliver to
                </span>
                <button
                  onClick={async () => { setAddressFormMode("list"); setCheckoutStep("address"); await reloadCheckoutAddresses(user.uid); }}
                  style={{ background: "none", border: "none", padding: 0, fontSize: 13, color: C.brand, fontWeight: 600, cursor: "pointer", fontFamily: ff, textDecoration: "underline" }}
                >
                  Change
                </button>
              </div>
              <div style={{ padding: 14, background: C.brandUltraLight, borderRadius: 12, fontSize: 13, color: C.dark, lineHeight: 1.6 }}>
                <strong>{selectedAddress.fullName}</strong> · {selectedAddress.phone}<br />
                {formatAddressLine(selectedAddress)}<br />
                {[selectedAddress.city, selectedAddress.state].filter(Boolean).join(", ")} - {selectedAddress.pincode}
              </div>
            </div>

            {/* Order summary */}
            <div style={{ padding: "16px", background: C.brandUltraLight, borderRadius: 12, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, color: C.dark }}>
                <span>Subtotal ({totalItems} items)</span>
                <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, color: C.textMuted }}>
                <span>Shipping</span>
                <span style={{ fontWeight: 600, color: subtotal >= 999 ? C.brand : C.dark }}>{subtotal >= 999 ? "FREE" : "₹49"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${C.brandLight}`, fontWeight: 700, fontSize: 15, color: C.dark }}>
                <span>Total</span>
                <span>₹{(subtotal + (subtotal >= 999 ? 0 : 49)).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div style={{ padding: "12px 14px", background: "#fff8e6", border: "1px solid #f0dca0", borderRadius: 10, fontSize: 12.5, color: "#7a5c00" }}>
              💵 Online payment isn't set up yet — this order will be placed as <strong>Cash on Delivery</strong>. You'll pay when it arrives.
            </div>

            <button
              onClick={async () => {
                setPlacingOrder(true);
                const shipping = subtotal >= 999 ? 0 : 49;
                const payment = await processPayment(subtotal + shipping);
                const order = await createOrder(
                  user.uid,
                  items,
                  {
                    name: selectedAddress.fullName,
                    phone: selectedAddress.phone,
                    email: selectedAddress.email,
                    address: formatAddressLine(selectedAddress),
                    city: selectedAddress.city,
                    district: selectedAddress.district,
                    state: selectedAddress.state,
                    country: selectedAddress.country,
                    pincode: selectedAddress.pincode,
                    addressType: selectedAddress.addressType,
                    deliveryInstructions: selectedAddress.deliveryInstructions,
                  },
                  payment
                );
                setPlacingOrder(false);
                if (order) {
                  setOrderNumber(order.orderNumber);
                  setOrderPaymentStatus(order.paymentStatus);
                  clearCart();
                  setCheckoutStep("success");
                }
              }}
              disabled={placingOrder}
              style={{
                width: "100%", padding: "14px 0", background: C.brand, color: C.white,
                border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
                fontFamily: ff, cursor: placingOrder ? "wait" : "pointer",
                opacity: placingOrder ? 0.7 : 1, transition: "background .2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {placingOrder && <Loader2 size={16} className="animate-spin" />}
              {placingOrder ? "Placing Order…" : "Place Order"}
            </button>
          </div>
        </div>
      )}

      {/* Order Success Overlay */}
      {checkoutStep === "success" && (
        <div
          style={{
            position: "fixed",
            top: 0, right: 0, bottom: 0,
            width: "min(420px, 100vw)",
            background: C.white,
            zIndex: 10001,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: ff,
            padding: 32,
            textAlign: "center",
            animation: "cart-fade-in .3s ease-out",
          }}
        >
          <CheckCircle size={56} color={C.brand} style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 22, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>Order Placed!</h3>
          <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 4px", lineHeight: 1.6 }}>
            Your order has been confirmed.
          </p>
          {orderNumber && (
            <p style={{ fontSize: 15, fontWeight: 700, color: C.brand, margin: "0 0 4px" }}>
              {orderNumber}
            </p>
          )}
          {orderPaymentStatus && (
            <p style={{ fontSize: 12.5, color: C.textMuted, margin: "0 0 24px", padding: "6px 12px", background: C.brandUltraLight, borderRadius: 20, display: "inline-block" }}>
              {PAYMENT_STATUS_LABELS[orderPaymentStatus as keyof typeof PAYMENT_STATUS_LABELS] || orderPaymentStatus}
            </p>
          )}
          <button
            onClick={() => { navigate("/products/orders"); closeCart(); }}
            style={{
              padding: "12px 28px", background: C.brand, color: C.white,
              border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
              fontFamily: ff, cursor: "pointer", marginBottom: 10, width: "100%",
            }}
          >
            View Orders
          </button>
          <button
            onClick={() => { closeCart(); navigate("/products"); }}
            style={{
              padding: "12px 28px", background: "transparent", color: C.dark,
              border: `1.5px solid ${C.brandLight}`, borderRadius: 12, fontSize: 13,
              fontWeight: 600, fontFamily: ff, cursor: "pointer", width: "100%",
            }}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes cart-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes cart-fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Phone Verification Modal */}
      {showPhoneVerify && (
        <>
          <div
            onClick={() => { setShowPhoneVerify(false); setOtpError(""); }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 10001 }}
          />
          <div
            style={{
              position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              zIndex: 10002, background: C.white, borderRadius: 20, padding: "36px 32px 32px",
              width: "min(400px, 90vw)", boxShadow: "0 20px 60px rgba(0,0,0,.18)",
              fontFamily: ff, textAlign: "center",
            }}
          >
            <button
              onClick={() => { setShowPhoneVerify(false); setOtpError(""); }}
              aria-label="Close"
              style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              <X size={20} color={C.textMuted} />
            </button>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <ShoppingBag size={36} color={C.brand} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>Verify your phone</h3>
            <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 24px", lineHeight: 1.6 }}>
              We need to verify your phone number before you can checkout.
            </p>

            {!otpSent ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 4, display: "block" }}>Phone Number</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select
                      value={otpCountryCode}
                      onChange={(e) => setOtpCountryCode(e.target.value)}
                      aria-label="Country code"
                      style={{
                        padding: "11px 8px",
                        border: `1.5px solid ${C.brandLight}`, borderRadius: 10,
                        fontSize: 14, fontFamily: ff, outline: "none",
                        background: C.white, color: C.dark, cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code + c.country} value={c.code}>
                          {c.code} {c.country}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={otpPhone}
                      onChange={(e) => setOtpPhone(e.target.value)}
                      placeholder="XXXXX XXXXX"
                      style={{
                        flex: 1, minWidth: 0, padding: "11px 14px",
                        border: `1.5px solid ${C.brandLight}`, borderRadius: 10,
                        fontSize: 14, fontFamily: ff, outline: "none", boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
                {otpError && <p style={{ fontSize: 13, color: "#e74c3c", margin: 0 }}>{otpError}</p>}
                <button
                  onClick={async () => {
                    if (!otpPhone.trim()) { setOtpError("Enter your phone number."); return; }
                    setOtpLoading(true); setOtpError("");
                    try {
                      const digitsOnly = otpPhone.trim().replace(/\D/g, "");
                      await sendPhoneOtp(`${otpCountryCode}${digitsOnly}`, "recaptcha-checkout");
                      setOtpSent(true);
                    } catch { /* toast in context */ }
                    finally { setOtpLoading(false); }
                  }}
                  disabled={otpLoading}
                  style={{
                    width: "100%", padding: "13px 0", background: C.brand, color: C.white,
                    border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
                    fontFamily: ff, cursor: otpLoading ? "wait" : "pointer",
                    opacity: otpLoading ? 0.7 : 1, marginTop: 4,
                  }}
                >
                  {otpLoading ? "Sending…" : "Send OTP"}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
                <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>
                  OTP sent to <strong>{otpCountryCode} {otpPhone}</strong>
                </p>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 4, display: "block" }}>Enter OTP</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    maxLength={6}
                    style={{
                      width: "100%", padding: "11px 14px",
                      border: `1.5px solid ${C.brandLight}`, borderRadius: 10,
                      fontSize: 18, fontFamily: ff, outline: "none", boxSizing: "border-box",
                      letterSpacing: "6px", textAlign: "center",
                    }}
                  />
                </div>
                {otpError && <p style={{ fontSize: 13, color: "#e74c3c", margin: 0 }}>{otpError}</p>}
                <button
                  onClick={async () => {
                    if (otpCode.length < 6) { setOtpError("Enter the 6-digit code."); return; }
                    setOtpLoading(true); setOtpError("");
                    try {
                      await verifyPhoneOtp(otpCode);
                      setShowPhoneVerify(false);
                      setOtpSent(false); setOtpCode(""); setOtpPhone("");
                      if (user) await goToAddressStep(user.uid);
                    } catch { /* toast in context */ }
                    finally { setOtpLoading(false); }
                  }}
                  disabled={otpLoading}
                  style={{
                    width: "100%", padding: "13px 0", background: C.brand, color: C.white,
                    border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
                    fontFamily: ff, cursor: otpLoading ? "wait" : "pointer",
                    opacity: otpLoading ? 0.7 : 1, marginTop: 4,
                  }}
                >
                  {otpLoading ? "Verifying…" : "Verify & Continue"}
                </button>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtpCode(""); setOtpError(""); }}
                  style={{
                    background: "none", border: "none", color: C.brand, fontSize: 13,
                    fontWeight: 600, cursor: "pointer", fontFamily: ff, padding: 0, textDecoration: "underline",
                    textAlign: "center",
                  }}
                >
                  Change number
                </button>
              </div>
            )}
            <div id="recaptcha-checkout" />
          </div>
        </>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <>
          <div
            onClick={() => { setShowLoginPrompt(false); setAuthError(""); }}
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
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,.18)",
              fontFamily: ff,
              textAlign: "center",
            }}
          >
            <button
              onClick={() => { setShowLoginPrompt(false); setAuthError(""); }}
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

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <ShoppingBag size={36} color={C.brand} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>
              {authMode === "login" ? "Sign in to continue" : "Create your account"}
            </h3>
            <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 24px", lineHeight: 1.6 }}>
              {authMode === "login"
                ? "Please sign in to proceed to checkout."
                : "Create an account to place orders and track them."}
            </p>

            {/* Google button */}
            <button
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  setShowLoginPrompt(false);
                  setAuthError("");
                  // Phone verification disabled for now — see checkout button comment above.
                  // Use auth.currentUser (not the `user` from useAuth()) — the hook's value
                  // is still stale inside this same closure right after signing in.
                  if (auth.currentUser) await goToAddressStep(auth.currentUser.uid);
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
                marginBottom: 20,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.brandUltraLight; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.white; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: C.brandLight }} />
              <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 500 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: C.brandLight }} />
            </div>

            {/* Email/Password Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setAuthError("");
                setAuthLoading(true);
                try {
                  if (authMode === "signup") {
                    if (!authName.trim()) { setAuthError("Please enter your name."); setAuthLoading(false); return; }
                    await signUp(authEmail, authPassword, authName.trim());
                  } else {
                    await signIn(authEmail, authPassword);
                  }
                  setShowLoginPrompt(false);
                  setAuthEmail(""); setAuthPassword(""); setAuthName(""); setAuthError("");
                  // Phone verification disabled for now — see checkout button comment above.
                  // Use auth.currentUser, not the (still-stale-in-this-closure) `user` from useAuth().
                  if (auth.currentUser) await goToAddressStep(auth.currentUser.uid);
                } catch {
                  /* toast shown by context */
                } finally {
                  setAuthLoading(false);
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}
            >
              {authMode === "signup" && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 4, display: "block" }}>Full Name</label>
                  <input
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="John Doe"
                    required={authMode === "signup"}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      border: `1.5px solid ${C.brandLight}`,
                      borderRadius: 10,
                      fontSize: 14,
                      fontFamily: ff,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              )}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 4, display: "block" }}>Email</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: `1.5px solid ${C.brandLight}`,
                    borderRadius: 10,
                    fontSize: 14,
                    fontFamily: ff,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 4, display: "block" }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    style={{
                      width: "100%",
                      padding: "11px 42px 11px 14px",
                      border: `1.5px solid ${C.brandLight}`,
                      borderRadius: 10,
                      fontSize: 14,
                      fontFamily: ff,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 2,
                    }}
                  >
                    {showPassword ? <EyeOff size={16} color={C.textMuted} /> : <Eye size={16} color={C.textMuted} />}
                  </button>
                </div>
              </div>

              {authError && (
                <p style={{ fontSize: 13, color: "#e74c3c", margin: 0 }}>{authError}</p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                style={{
                  width: "100%",
                  padding: "13px 0",
                  background: C.brand,
                  color: C.white,
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: ff,
                  cursor: authLoading ? "wait" : "pointer",
                  opacity: authLoading ? 0.7 : 1,
                  transition: "background .2s",
                  marginTop: 4,
                }}
                onMouseEnter={(e) => { if (!authLoading) (e.currentTarget as HTMLElement).style.background = C.brandDark; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.brand; }}
              >
                {authLoading ? "Please wait…" : authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Toggle mode */}
            <p style={{ fontSize: 13, color: C.textMuted, marginTop: 16, marginBottom: 0 }}>
              {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthError(""); }}
                style={{
                  background: "none",
                  border: "none",
                  color: C.brand,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: ff,
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                {authMode === "login" ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default CartDrawer;
