"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, selectedVariants?: { [key: string]: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  selectedProductModal: MenuItem | null;
  setSelectedProductModal: (item: MenuItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<MenuItem | null>(null);

  // Load cart from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("noir_ember_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("noir_ember_cart", JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const addToCart = (item: MenuItem, quantity = 1, selectedVariants = {}) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && JSON.stringify(ci.selectedVariants) === JSON.stringify(selectedVariants)
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: `${item.id}-${Date.now()}`,
          menuItem: item,
          quantity,
          selectedVariants,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cart.reduce((acc, i) => acc + i.menuItem.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        selectedProductModal,
        setSelectedProductModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
