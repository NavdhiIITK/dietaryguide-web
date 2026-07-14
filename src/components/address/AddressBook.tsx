import { useEffect, useState } from "react";
import { Address, AddressInput } from "@/types/address";
import { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from "@/services/addressService";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { Plus, Loader2, MapPinOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const C = {
  brand: "#55b685", brandLight: "#d6f0e3", brandUltraLight: "#eef8f2",
  dark: "#1e1e1e", textMuted: "#6b7c72", white: "#ffffff",
};
const ff = "'Space Grotesk', 'Inter', sans-serif";

export default function AddressBook({ uid }: { uid: string }) {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editing, setEditing] = useState<Address | null>(null);

  const load = async () => {
    setLoading(true);
    const a = await getAddresses(uid);
    setAddresses(a);
    setLoading(false);
  };

  useEffect(() => { load(); }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (input: AddressInput) => {
    setSaving(true);
    try {
      if (mode === "edit" && editing) {
        await updateAddress(uid, editing.id, input);
        toast({ title: "Address updated" });
      } else {
        await addAddress(uid, input);
        toast({ title: "Address saved" });
      }
      await load();
      setMode("list");
      setEditing(null);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Couldn't save address", description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (address: Address) => {
    if (!window.confirm(`Delete the address for ${address.fullName}?`)) return;
    try {
      await deleteAddress(uid, address.id);
      toast({ title: "Address deleted" });
      await load();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Couldn't delete address", description: err.message });
    }
  };

  const handleSetDefault = async (address: Address) => {
    try {
      await setDefaultAddress(uid, address.id);
      await load();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Couldn't set default", description: err.message });
    }
  };

  const filtered = addresses.filter((a) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      a.fullName.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.nickname?.toLowerCase().includes(q) ||
      a.pincode.includes(q)
    );
  });

  if (mode === "add" || mode === "edit") {
    return (
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 16, fontFamily: ff }}>
          {mode === "edit" ? "Edit Address" : "Add New Address"}
        </h3>
        <AddressForm
          initial={editing || undefined}
          existingAddresses={addresses}
          saving={saving}
          onSave={handleSave}
          onCancel={() => { setMode("list"); setEditing(null); }}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search addresses…"
          style={{ flex: 1, minWidth: 160, padding: "10px 14px", border: `1.5px solid ${C.brandLight}`, borderRadius: 10, fontSize: 13, fontFamily: ff, outline: "none" }}
        />
        <button
          onClick={() => setMode("add")}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: C.brand, color: C.white, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: ff, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          <Plus size={15} /> Add New Address
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textMuted, padding: "24px 0", fontFamily: ff }}>
          <Loader2 size={18} className="animate-spin" /> Loading addresses…
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: C.textMuted, fontFamily: ff }}>
          <MapPinOff size={36} style={{ marginBottom: 10, opacity: 0.5 }} />
          <p style={{ margin: 0 }}>{addresses.length === 0 ? "No saved addresses yet." : "No addresses match your search."}</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {filtered.map((a) => (
            <AddressCard
              key={a.id}
              address={a}
              onEdit={() => { setEditing(a); setMode("edit"); }}
              onDelete={() => handleDelete(a)}
              onSetDefault={() => handleSetDefault(a)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
