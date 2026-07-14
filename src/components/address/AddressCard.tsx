import { Address, formatAddressLine } from "@/types/address";
import { Home, Briefcase, MapPin, Pencil, Trash2, CheckCircle2 } from "lucide-react";

const C = {
  brand: "#55b685", brandLight: "#d6f0e3", brandUltraLight: "#eef8f2",
  dark: "#1e1e1e", gold: "#c9a96e", textMuted: "#6b7c72", white: "#ffffff",
};
const ff = "'Space Grotesk', 'Inter', sans-serif";

const TYPE_ICON = { Home: Home, Work: Briefcase, Other: MapPin };

interface AddressCardProps {
  address: Address;
  selected?: boolean;
  onSelect?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault?: () => void;
}

export default function AddressCard({ address, selected, onSelect, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  const TypeIcon = TYPE_ICON[address.addressType] || MapPin;

  return (
    <div
      style={{
        border: `1.5px solid ${selected ? C.brand : C.brandLight}`,
        borderRadius: 14, padding: 16, fontFamily: ff,
        background: selected ? C.brandUltraLight : C.white,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: C.brandUltraLight, color: C.brand }}>
          <TypeIcon size={11} /> {address.nickname || address.addressType}
        </span>
        {address.isDefault && (
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "#f5eedd", color: C.gold }}>
            Default
          </span>
        )}
      </div>

      <p style={{ margin: 0, fontWeight: 700, color: C.dark, fontSize: 14 }}>{address.fullName}</p>
      <p style={{ margin: "2px 0 8px", fontSize: 13, color: C.textMuted }}>{address.phone}</p>
      <p style={{ margin: 0, fontSize: 13, color: C.dark, lineHeight: 1.6 }}>
        {formatAddressLine(address)}<br />
        {[address.city, address.district, address.state].filter(Boolean).join(", ")} - {address.pincode}
      </p>
      {address.deliveryInstructions && (
        <p style={{ margin: "8px 0 0", fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>
          Note: {address.deliveryInstructions}
        </p>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {onSelect && (
          <button
            onClick={onSelect}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
              background: selected ? C.brand : C.dark, color: C.white, border: "none", borderRadius: 10,
              fontSize: 13, fontWeight: 700, fontFamily: ff, cursor: "pointer",
            }}
          >
            {selected && <CheckCircle2 size={14} />}
            {selected ? "Selected" : "Deliver Here"}
          </button>
        )}
        <button onClick={onEdit} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "transparent", color: C.dark, border: `1.5px solid ${C.brandLight}`, borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: ff, cursor: "pointer" }}>
          <Pencil size={13} /> Edit
        </button>
        <button onClick={onDelete} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "transparent", color: "#e74c3c", border: "1.5px solid #f5c6c6", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: ff, cursor: "pointer" }}>
          <Trash2 size={13} /> Delete
        </button>
        {onSetDefault && !address.isDefault && (
          <button onClick={onSetDefault} style={{ padding: "8px 14px", background: "transparent", color: C.brand, border: `1.5px solid ${C.brand}`, borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: ff, cursor: "pointer" }}>
            Set Default
          </button>
        )}
      </div>
    </div>
  );
}
