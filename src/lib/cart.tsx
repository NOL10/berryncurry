import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartDept = "fruits" | "bakery";

export interface CartItem {
  slug: string;
  dept: CartDept;
  name: string;
  price: number;
  image: string;
  weight: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (dept: CartDept, slug: string, qty: number) => void;
  remove: (dept: CartDept, slug: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "bnc.cart.v1";
const key = (i: { dept: CartDept; slug: string }) => `${i.dept}:${i.slug}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add: CartCtx["add"] = useCallback((item, qty = 1) => {
    setItems((prev) => {
      const k = key(item);
      const existing = prev.find((p) => key(p) === k);
      if (existing) return prev.map((p) => (key(p) === k ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { ...item, qty }];
    });
  }, []);

  const setQty: CartCtx["setQty"] = useCallback((dept, slug, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => !(p.dept === dept && p.slug === slug))
        : prev.map((p) => (p.dept === dept && p.slug === slug ? { ...p, qty } : p)),
    );
  }, []);

  const remove: CartCtx["remove"] = useCallback((dept, slug) => {
    setItems((prev) => prev.filter((p) => !(p.dept === dept && p.slug === slug)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { items, count, subtotal, add, setQty, remove, clear };
  }, [items, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}