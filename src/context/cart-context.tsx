import { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from "react";
import { useAuth } from "@/context/auth-context";
import {
  loadCartFromFirestore,
  saveCartItemToFirestore,
  removeCartItemFromFirestore,
  clearCartFromFirestore,
} from "@/services/storeService";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

const STORAGE_KEY = "dg-cart";

function loadLocalCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Firestore cart takes priority for existing items; local-only items are appended. */
function mergeCartItems(local: CartItem[], remote: CartItem[]): CartItem[] {
  const merged = new Map<string, CartItem>();
  for (const item of remote) merged.set(item.id, item);
  for (const item of local) {
    if (!merged.has(item.id)) merged.set(item.id, item);
  }
  return Array.from(merged.values());
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QTY": {
      if (action.payload.quantity < 1) {
        return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadLocalCart(),
    isOpen: false,
  });

  // Track previous item IDs so we can delete removed items from Firestore
  const prevItemIdsRef = useRef<Set<string>>(new Set(loadLocalCart().map((i) => i.id)));
  const syncTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const loadedUidRef = useRef<string | null>(null);

  // When user logs in, load their Firestore cart and merge with local items
  useEffect(() => {
    if (!user) {
      loadedUidRef.current = null;
      return;
    }
    if (loadedUidRef.current === user.uid) return;
    loadedUidRef.current = user.uid;

    const localItems = loadLocalCart();
    (async () => {
      const firestoreRaw = await loadCartFromFirestore(user.uid);
      const firestoreItems: CartItem[] = firestoreRaw.map((f) => ({
        id: f.productId,
        name: f.name,
        price: f.price,
        image: f.image,
        quantity: f.quantity,
      }));
      const merged = mergeCartItems(localItems, firestoreItems);
      dispatch({ type: "SET_ITEMS", payload: merged });
      // Write merged result back so local-only items get persisted
      for (const item of merged) {
        await saveCartItemToFirestore(user.uid, item);
      }
      prevItemIdsRef.current = new Set(merged.map((i) => i.id));
    })();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist to localStorage + debounced sync to Firestore on items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));

    if (!user) {
      prevItemIdsRef.current = new Set(state.items.map((i) => i.id));
      return;
    }

    const prevIds = new Set(prevItemIdsRef.current);
    const currentIds = new Set(state.items.map((i) => i.id));
    prevItemIdsRef.current = currentIds;

    clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(async () => {
      // Delete items that were removed
      for (const oldId of prevIds) {
        if (!currentIds.has(oldId)) {
          await removeCartItemFromFirestore(user.uid, oldId);
        }
      }
      // Upsert all current items
      for (const item of state.items) {
        await saveCartItemToFirestore(user.uid, item);
      }
    }, 400);
  }, [state.items]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
    dispatch({ type: "OPEN_CART" });
  };
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    if (user) clearCartFromFirestore(user.uid);
  };
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });

  return (
    <CartContext.Provider
      value={{ items: state.items, isOpen: state.isOpen, totalItems, subtotal, addItem, removeItem, updateQty, clearCart, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
