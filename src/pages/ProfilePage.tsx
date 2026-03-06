import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { getProfile, updateProfile as updateUserProfile } from "@/services/storeService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Save, Loader2, User, MapPin, CheckCircle } from "lucide-react";

const C = {
  brand: "#55b685", brandDark: "#3d8a63", brandLight: "#d6f0e3", brandUltraLight: "#eef8f2",
  cream: "#faf9f6", dark: "#1e1e1e", gold: "#c9a96e", textMuted: "#6b7c72", white: "#ffffff",
};
const ff = "'Space Grotesk', 'Inter', sans-serif";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px",
  border: `1.5px solid ${C.brandLight}`, borderRadius: 10,
  fontSize: 14, fontFamily: ff, outline: "none",
  boxSizing: "border-box", background: C.white, transition: "border-color .2s",
};
const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: C.dark,
  marginBottom: 5, display: "block",
};
const sectionCard: React.CSSProperties = {
  background: C.white, borderRadius: 16,
  border: `1px solid ${C.brandLight}`, padding: "24px",
  marginBottom: 20,
};

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [addressMsg, setAddressMsg] = useState("");

  // Profile fields
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");

  // Address fields
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/products"); return; }
    (async () => {
      setLoading(true);
      const p = await getProfile(user.uid);
      if (p) {
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
      setLoading(false);
    })();
  }, [user, authLoading, navigate]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    await updateUserProfile(user.uid, { name: displayName, email: user.email, phone, photoURL: user.photoURL });
    setSavingProfile(false);
    setProfileMsg("Profile saved!");
    setTimeout(() => setProfileMsg(""), 3000);
  };

  const handleSaveAddress = async () => {
    if (!user) return;
    setSavingAddress(true);
    await updateUserProfile(user.uid, {
      address: { line1: addressLine1, line2: addressLine2, city, state, pincode },
    });
    setSavingAddress(false);
    setAddressMsg("Address saved!");
    setTimeout(() => setAddressMsg(""), 3000);
  };

  if (authLoading) return null;
  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: C.cream, fontFamily: ff }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "100px 16px 60px" }}>

        {/* Back */}
        <a
          href="/products"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, color: C.brand, fontWeight: 600, fontFamily: ff,
            marginBottom: 24, padding: 0, textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} /> Back to Store
        </a>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            background: C.brandLight, display: "flex", alignItems: "center", justifyContent: "center",
            border: `3px solid ${C.brand}`,
          }}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
            ) : (
              <span style={{ fontSize: 22, fontWeight: 700, color: C.brand }}>
                {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.dark, margin: 0 }}>My Profile</h1>
            <p style={{ fontSize: 13, color: C.textMuted, margin: "2px 0 0" }}>{user.email}</p>
          </div>
        </div>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "60px 0", color: C.textMuted }}>
            <Loader2 size={20} className="animate-spin" /> Loading profile...
          </div>
        ) : (
          <>
            {/* Personal Info */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: C.brandUltraLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={16} color={C.brand} />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: C.dark, margin: 0 }}>Personal Information</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    style={inputStyle}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    style={{ ...inputStyle, background: "#f5f5f5", color: C.textMuted, cursor: "not-allowed" }}
                    value={user.email || ""}
                    disabled
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    style={inputStyle}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {profileMsg && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.brand, fontWeight: 600 }}>
                    <CheckCircle size={15} /> {profileMsg}
                  </div>
                )}

                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  style={{
                    alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "11px 22px", background: savingProfile ? C.brandLight : C.brand,
                    color: savingProfile ? C.brand : C.white,
                    border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700,
                    fontFamily: ff, cursor: savingProfile ? "wait" : "pointer", transition: "all .2s",
                  }}
                >
                  <Save size={15} /> {savingProfile ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>

            {/* Address */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: C.brandUltraLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MapPin size={16} color={C.brand} />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: C.dark, margin: 0 }}>Shipping Address</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Address Line 1</label>
                  <input style={inputStyle} value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="House/Flat No, Building, Street" />
                </div>
                <div>
                  <label style={labelStyle}>Address Line 2 <span style={{ fontWeight: 400, color: C.textMuted }}>(Optional)</span></label>
                  <input style={inputStyle} value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Landmark, Area" />
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
                <div style={{ maxWidth: 180 }}>
                  <label style={labelStyle}>Pincode</label>
                  <input style={inputStyle} value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="XXXXXX" maxLength={6} />
                </div>

                {addressMsg && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.brand, fontWeight: 600 }}>
                    <CheckCircle size={15} /> {addressMsg}
                  </div>
                )}

                <button
                  onClick={handleSaveAddress}
                  disabled={savingAddress}
                  style={{
                    alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "11px 22px", background: savingAddress ? C.brandLight : C.brand,
                    color: savingAddress ? C.brand : C.white,
                    border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700,
                    fontFamily: ff, cursor: savingAddress ? "wait" : "pointer", transition: "all .2s",
                  }}
                >
                  <Save size={15} /> {savingAddress ? "Saving..." : "Save Address"}
                </button>
              </div>
            </div>

            {/* Quick links */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/products/orders")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "10px 18px", background: C.brandUltraLight,
                  color: C.brand, border: `1px solid ${C.brandLight}`,
                  borderRadius: 10, fontSize: 13, fontWeight: 600,
                  fontFamily: ff, cursor: "pointer",
                }}
              >
                View My Orders →
              </button>
              <button
                onClick={() => navigate("/products")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "10px 18px", background: C.white,
                  color: C.textMuted, border: `1px solid ${C.brandLight}`,
                  borderRadius: 10, fontSize: 13, fontWeight: 600,
                  fontFamily: ff, cursor: "pointer",
                }}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
