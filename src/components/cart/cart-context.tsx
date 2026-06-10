"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getWhatsAppUrl } from "@/lib/brand";
import { Product } from "@/lib/types";

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  category: string;
  imageUrl: string;
  weight: string;
  unitPrice: number;
  quantity: number;
}

interface AddToCartPayload {
  product: Product;
  weight: string;
  unitPrice: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  total: number;
  notice: string | null;
  setIsOpen: (open: boolean) => void;
  clearNotice: () => void;
  addToCart: (payload: AddToCartPayload) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  getWhatsAppOrderUrl: () => string;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "finjani_cart_items";

export function formatDhAmount(value: number) {
  return `${value} MAD`;
}

function buildOrderMessage(items: CartItem[]) {
  if (items.length === 0) {
    return "Bonjour Finjani Aroma,%0A%0AJe souhaite commander.%0A%0AMerci.";
  }

  const lines = items.map((item) => {
    const lineTotal = item.unitPrice * item.quantity;
    return `- ${item.name} ${item.weight} x${item.quantity} = ${formatDhAmount(lineTotal)}`;
  });

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return [
    "Bonjour Finjani Aroma,",
    "",
    "Je souhaite commander :",
    "",
    ...lines,
    "",
    `Total : ${formatDhAmount(total)}`,
    "",
    "Merci.",
  ].join("\n");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter(
        (item) =>
          typeof item?.key === "string" &&
          typeof item?.name === "string" &&
          typeof item?.weight === "string" &&
          typeof item?.unitPrice === "number" &&
          typeof item?.quantity === "number"
      );
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timer = window.setTimeout(() => setNotice(null), 2200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const addToCart = useCallback(({ product, weight, unitPrice, quantity }: AddToCartPayload) => {
    const normalizedQty = Math.max(1, quantity);
    const key = `${product.id}::${weight}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (!existing) {
        return [
          ...prev,
          {
            key,
            productId: product.id,
            name: product.name,
            category: product.category,
            imageUrl: product.imageUrl,
            weight,
            unitPrice,
            quantity: normalizedQty,
          },
        ];
      }

      return prev.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity: item.quantity + normalizedQty,
              unitPrice,
            }
          : item
      );
    });

    setNotice("Produit ajouté au panier");
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.key !== key));
      return;
    }

    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const clearNotice = useCallback(() => {
    setNotice(null);
  }, []);

  const getWhatsAppOrderUrl = useCallback(() => {
    const message = buildOrderMessage(items);
    return getWhatsAppUrl(message);
  }, [items]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return {
      items,
      isOpen,
      itemCount,
      total,
      notice,
      setIsOpen,
      clearNotice,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      getWhatsAppOrderUrl,
    };
  }, [items, isOpen, notice, clearNotice, addToCart, updateQuantity, removeItem, clearCart, getWhatsAppOrderUrl]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
