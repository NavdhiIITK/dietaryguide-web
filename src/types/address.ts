export type AddressType = "Home" | "Work" | "Other";

// Kept deliberately flat/open — new fields (gstNumber, companyName, addressCategory,
// deliveryWindow, etc.) can be added later without migrating existing documents,
// since Firestore is schemaless and every read here already tolerates missing fields.
export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  houseNumber: string;
  building?: string;
  street: string;
  area: string;
  landmark?: string;
  village?: string;
  city: string;
  district?: string;
  state: string;
  country: string;
  pincode: string;
  addressType: AddressType;
  nickname?: string;
  deliveryInstructions?: string;
  isDefault: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export type AddressInput = Omit<Address, "id" | "createdAt" | "updatedAt">;

const INDIAN_PHONE_RE = /^[6-9]\d{9}$/;
const INDIAN_PINCODE_RE = /^[1-9]\d{5}$/;

export function normalizeIndianPhone(raw: string): string {
  return raw.trim().replace(/[^\d]/g, "").replace(/^91(?=\d{10}$)/, "");
}

export function isValidIndianPhone(raw: string): boolean {
  return INDIAN_PHONE_RE.test(normalizeIndianPhone(raw));
}

export function isValidIndianPincode(raw: string): boolean {
  return INDIAN_PINCODE_RE.test(raw.trim());
}

export interface AddressFormErrors {
  fullName?: string;
  phone?: string;
  houseNumber?: string;
  street?: string;
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export function validateAddress(a: Partial<AddressInput>): AddressFormErrors {
  const errors: AddressFormErrors = {};
  if (!a.fullName?.trim()) errors.fullName = "Full name is required.";
  if (!a.phone?.trim()) errors.phone = "Phone number is required.";
  else if (!isValidIndianPhone(a.phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!a.houseNumber?.trim()) errors.houseNumber = "House/Flat number is required.";
  if (!a.street?.trim()) errors.street = "Street is required.";
  if (!a.area?.trim()) errors.area = "Area/Locality is required.";
  if (!a.city?.trim()) errors.city = "City is required.";
  if (!a.state?.trim()) errors.state = "State is required.";
  if (!a.pincode?.trim()) errors.pincode = "PIN code is required.";
  else if (!isValidIndianPincode(a.pincode)) errors.pincode = "Enter a valid 6-digit PIN code.";
  return errors;
}

/** Two addresses are "the same" if house/street/area/city/pincode match, ignoring case/whitespace. */
export function isDuplicateAddress(a: AddressInput, existing: Address[]): boolean {
  const key = (x: Pick<AddressInput, "houseNumber" | "street" | "area" | "city" | "pincode">) =>
    [x.houseNumber, x.street, x.area, x.city, x.pincode]
      .map((s) => (s || "").trim().toLowerCase().replace(/\s+/g, " "))
      .join("|");
  const target = key(a);
  return existing.some((e) => key(e) === target);
}

export function formatAddressLine(a: Address | AddressInput): string {
  return [a.houseNumber, a.building, a.street, a.area, a.landmark, a.village]
    .filter(Boolean)
    .join(", ");
}
