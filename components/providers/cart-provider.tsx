"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/products";
type CartLine = Product & { quantity: number };
type CartValue = { items: CartLine[]; add: (product: Product) => void; remove: (id: number) => void; change: (id: number, quantity: number) => void; isOpen: boolean; setOpen: (open: boolean) => void; count: number; total: number; toast: boolean };
const CartContext = createContext<CartValue | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]); const [isOpen, setOpen] = useState(false); const [toast, setToast] = useState(false);
  const value = useMemo(() => ({
    items, isOpen, setOpen,
    add: (product: Product) => { setItems((old) => old.some((line) => line.id === product.id) ? old.map((line) => line.id === product.id ? {...line, quantity: line.quantity + 1} : line) : [...old, {...product, quantity: 1}]); setToast(true); window.setTimeout(() => setToast(false), 2200); },
    remove: (id: number) => setItems((old) => old.filter((line) => line.id !== id)),
    change: (id: number, quantity: number) => setItems((old) => quantity < 1 ? old.filter((line) => line.id !== id) : old.map((line) => line.id === id ? {...line, quantity} : line)),
    count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.price * item.quantity, 0), toast
  }), [items, isOpen, toast]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used within CartProvider"); return context; };
