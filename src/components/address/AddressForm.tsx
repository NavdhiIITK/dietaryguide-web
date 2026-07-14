import { useState } from "react";
import { Address, AddressInput, AddressType, validateAddress, isDuplicateAddress } from "@/types/address";
import { INDIA_STATES, CITIES_BY_STATE, OTHER_CITY_OPTION } from "@/data/india-states-cities";
import { Loader2, MapPin } from "lucide-react";

const C = {
  brand: "#55b685", brandDark: "#3d8a63", brandLight: "#d6f0e3", brandUltraLight: "#eef8f2",
  dark: "#1e1e1e", textMuted: "#6b7c72", white: "#ffffff",
};
const ff = "'Space Grotesk', 'Inter', sans-serif";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", border: `1.5px solid ${C.brandLight}`, borderRadius: 10,
  fontSize: 14, fontFamily: ff, outline: "none", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 4, display: "block" };
const errStyle: React.CSSProperties = { fontSize: 12, color: "#e74c3c", margin: "4px 0 0" };

interface AddressFormProps {
  initial?: Address;
  existingAddresses: Address[];
  saving?: boolean;
  onSave: (input: AddressInput) => Promise<void> | void;
  onCancel: () => void;
}

const emptyForm = (): AddressInput => ({
  fullName: "", phone: "", email: "", houseNumber: "", building: "", street: "", area: "",
  landmark: "", village: "", city: "", district: "", state: "", country: "India", pincode: "",
  addressType: "Home", nickname: "", deliveryInstructions: "", isDefault: false,
});

export default function AddressForm({ initial, existingAddresses, saving, onSave, onCancel }: AddressFormProps) {
  const [form, setForm] = useState<AddressInput>(() =>
    initial ? { ...emptyForm(), ...initial } : emptyForm()
  );
  const [cityIsOther, setCityIsOther] = useState(
    !!initial?.city && !!initial?.state && !(CITIES_BY_STATE[initial.state] || []).includes(initial.city)
  );
  const [errors, setErrors] = useState<ReturnType<typeof validateAddress>>({});
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const set = <K extends keyof AddressInput>(key: K, value: AddressInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const useCurrentLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Your browser doesn't support location detection.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { Accept: "application/json" } }
          );
          const data = await res.json();
          const a = data.address || {};
          setForm((f) => ({
            ...f,
            street: f.street || a.road || a.pedestrian || "",
            area: f.area || a.suburb || a.neighbourhood || a.residential || "",
            village: f.village || a.village || "",
            city: f.city || a.city || a.town || a.county || "",
            district: f.district || a.state_district || "",
            state: f.state || a.state || "",
            pincode: f.pincode || a.postcode || "",
          }));
          setCityIsOther(true); // reverse-geocoded city may not be in our dropdown list — let them confirm/edit
        } catch {
          setLocationError("Couldn't determine your address from that location. Please fill it in manually.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. You can still fill the address in manually."
            : "Couldn't get your location. Please fill the address in manually."
        );
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAddress(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const otherExisting = existingAddresses.filter((a) => a.id !== initial?.id);
    if (isDuplicateAddress(form, otherExisting) && !duplicateWarning) {
      setDuplicateWarning(true);
      return;
    }
    await onSave(form);
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input style={inputStyle} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Recipient name" />
          {errors.fullName && <p style={errStyle}>{errors.fullName}</p>}
        </div>
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="9170268705" type="tel" />
          {errors.phone && <p style={errStyle}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email (optional)</label>
        <input style={inputStyle} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" type="email" />
      </div>

      <button
        type="button"
        onClick={useCurrentLocation}
        disabled={locating}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "10px 0", background: C.brandUltraLight, color: C.brand, border: `1.5px dashed ${C.brand}`,
          borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: ff, cursor: locating ? "wait" : "pointer",
        }}
      >
        {locating ? <Loader2 size={15} className="animate-spin" /> : <MapPin size={15} />}
        {locating ? "Detecting location…" : "Use Current Location"}
      </button>
      {locationError && <p style={errStyle}>{locationError}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>House / Flat Number *</label>
          <input style={inputStyle} value={form.houseNumber} onChange={(e) => set("houseNumber", e.target.value)} placeholder="221B" />
          {errors.houseNumber && <p style={errStyle}>{errors.houseNumber}</p>}
        </div>
        <div>
          <label style={labelStyle}>Building / Apartment</label>
          <input style={inputStyle} value={form.building} onChange={(e) => set("building", e.target.value)} placeholder="Optional" />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Street *</label>
        <input style={inputStyle} value={form.street} onChange={(e) => set("street", e.target.value)} placeholder="Street name" />
        {errors.street && <p style={errStyle}>{errors.street}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Area / Locality *</label>
          <input style={inputStyle} value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="Area" />
          {errors.area && <p style={errStyle}>{errors.area}</p>}
        </div>
        <div>
          <label style={labelStyle}>Landmark</label>
          <input style={inputStyle} value={form.landmark} onChange={(e) => set("landmark", e.target.value)} placeholder="Optional" />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Village (if applicable)</label>
        <input style={inputStyle} value={form.village} onChange={(e) => set("village", e.target.value)} placeholder="Optional" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>State *</label>
          <select
            style={{ ...inputStyle, background: C.white, cursor: "pointer" }}
            value={form.state}
            onChange={(e) => { set("state", e.target.value); set("city", ""); setCityIsOther(false); }}
          >
            <option value="">Select State</option>
            {INDIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p style={errStyle}>{errors.state}</p>}
        </div>
        <div>
          <label style={labelStyle}>City *</label>
          {cityIsOther ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <input style={inputStyle} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Enter city name" />
              <button type="button" onClick={() => { setCityIsOther(false); set("city", ""); }}
                style={{ background: "none", border: "none", padding: 0, fontSize: 12, color: C.brand, cursor: "pointer", textAlign: "left", fontFamily: ff }}>
                ← Choose from list instead
              </button>
            </div>
          ) : (
            <select
              style={{ ...inputStyle, background: C.white, cursor: form.state ? "pointer" : "not-allowed", opacity: form.state ? 1 : 0.6 }}
              value={form.city}
              disabled={!form.state}
              onChange={(e) => {
                if (e.target.value === OTHER_CITY_OPTION) { setCityIsOther(true); set("city", ""); }
                else set("city", e.target.value);
              }}
            >
              <option value="">{form.state ? "Select City" : "Select state first"}</option>
              {(CITIES_BY_STATE[form.state] || []).map((c) => <option key={c} value={c}>{c}</option>)}
              {form.state && <option value={OTHER_CITY_OPTION}>{OTHER_CITY_OPTION}</option>}
            </select>
          )}
          {errors.city && <p style={errStyle}>{errors.city}</p>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>District</label>
          <input style={inputStyle} value={form.district} onChange={(e) => set("district", e.target.value)} placeholder="Optional" />
        </div>
        <div>
          <label style={labelStyle}>Country</label>
          <input style={{ ...inputStyle, background: C.brandUltraLight, color: C.textMuted }} value={form.country} readOnly />
        </div>
        <div>
          <label style={labelStyle}>PIN Code *</label>
          <input style={inputStyle} value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="208016" />
          {errors.pincode && <p style={errStyle}>{errors.pincode}</p>}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Address Type</label>
        <div style={{ display: "flex", gap: 8 }}>
          {(["Home", "Work", "Other"] as AddressType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("addressType", t)}
              style={{
                padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600, fontFamily: ff, cursor: "pointer",
                border: `1.5px solid ${form.addressType === t ? C.brand : C.brandLight}`,
                background: form.addressType === t ? C.brand : "transparent",
                color: form.addressType === t ? C.white : C.dark,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Nickname (optional)</label>
        <input style={inputStyle} value={form.nickname} onChange={(e) => set("nickname", e.target.value)} placeholder="e.g. Mom's house" />
      </div>

      <div>
        <label style={labelStyle}>Delivery Instructions (optional)</label>
        <input style={inputStyle} value={form.deliveryInstructions} onChange={(e) => set("deliveryInstructions", e.target.value)} placeholder="e.g. Leave with security guard" />
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.dark, cursor: "pointer" }}>
        <input type="checkbox" checked={form.isDefault} onChange={(e) => set("isDefault", e.target.checked)} />
        Set as Default Address
      </label>

      {duplicateWarning && (
        <div style={{ padding: "10px 14px", background: "#fff8e6", border: "1px solid #f0dca0", borderRadius: 10, fontSize: 13, color: "#7a5c00" }}>
          This looks like an address you've already saved. Click "Save Address" again to save it anyway, or edit the fields above.
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button type="button" onClick={onCancel} style={{ flex: 1, padding: "12px 0", background: "transparent", color: C.dark, border: `1.5px solid ${C.brandLight}`, borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: ff, cursor: "pointer" }}>
          Cancel
        </button>
        <button type="submit" disabled={saving} style={{ flex: 2, padding: "12px 0", background: C.brand, color: C.white, border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: ff, cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {saving && <Loader2 size={16} className="animate-spin" />}
          {duplicateWarning ? "Save Anyway" : "Save Address"}
        </button>
      </div>
    </form>
  );
}
