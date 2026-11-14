"use client";

import React, { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const deliveryFee = orderType === "delivery" ? 5 : 0;
  const tax = Number((subtotal * 0.0825).toFixed(2));
  const grandTotal = Number((subtotal + deliveryFee + tax).toFixed(2));

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setOrderComplete(false);
        }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0c0a] border-l border-[#e5a93c]/20 shadow-2xl flex flex-col justify-between text-[#f5f2ec]">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e5a93c]/15 flex items-center justify-center text-[#e5a93c]">
                <ShoppingBag size={16} />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Your Order</h3>
                <span className="text-[11px] text-[#e5a93c] tracking-wider uppercase font-medium">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setOrderComplete(false);
              }}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e5a93c]/15 border border-[#e5a93c] flex items-center justify-center text-[#e5a93c]">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-[#f5f2ec]">
                  Order Placed (Demo)
                </h4>
                <p className="text-xs text-[#f5f2ec]/70 max-w-xs leading-relaxed font-light">
                  Thank you! Your demo order has been logged. Our kitchen is preparing your Wagyu burger to perfection.
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#e5a93c] font-mono">
                  Order #NE-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#e5a93c] text-[#080706] text-xs uppercase font-bold tracking-wider"
                >
                  Return to Menu
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="text-lg font-bold text-[#f5f2ec]">Your order is empty</h4>
                <p className="text-xs text-white/50 max-w-xs font-light">
                  Explore our signature artisanal burgers, craft truffle frites, and sommelier cellar pairings.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-[#e5a93c]/40 text-[#e5a93c] text-xs uppercase font-semibold tracking-wider hover:bg-[#e5a93c]/10 transition-all"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Delivery vs Pickup Toggle */}
                <div className="grid grid-cols-2 p-1 bg-white/5 rounded-full border border-white/10 text-xs">
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 rounded-full font-medium transition-all ${
                      orderType === "delivery"
                        ? "bg-[#e5a93c] text-[#080706] font-bold shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    White-Glove Delivery
                  </button>
                  <button
                    onClick={() => setOrderType("pickup")}
                    className={`py-2 rounded-full font-medium transition-all ${
                      orderType === "pickup"
                        ? "bg-[#e5a93c] text-[#080706] font-bold shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Atelier Pickup
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#e5a93c]/30 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-[#f5f2ec]">{item.menuItem.name}</h5>
                        {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                          <div className="text-[10px] text-[#e5a93c] mt-0.5 space-x-1">
                            {Object.values(item.selectedVariants).join(" • ")}
                          </div>
                        )}
                        <span className="text-xs text-white/60 font-mono mt-1 block">
                          ${item.menuItem.price} each
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white/50 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white/50 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/30 hover:text-rose-400 p-1.5 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer / Summary */}
          {!orderComplete && cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0a0807] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#f5f2ec]">${subtotal.toFixed(2)}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between text-white/60">
                    <span>Precision Delivery</span>
                    <span className="font-mono text-[#f5f2ec]">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Estimated Tax</span>
                  <span className="font-mono text-[#f5f2ec]">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-base text-[#f5f2ec]">
                  <span>Total Due</span>
                  <span className="font-mono text-[#e5a93c]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Demo Notice Disclaimer */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#e5a93c]/10 border border-[#e5a93c]/20 text-[10px] text-[#e5a93c]">
                <ShieldCheck size={14} className="shrink-0" />
                <span>Demo Checkout Experience (Simulated Transaction)</span>
              </div>

              {/* Checkout Button */}
              <button
                disabled={isCheckingOut}
                onClick={handleSimulateCheckout}
                className="w-full py-4 rounded-full bg-[#e5a93c] text-[#080706] font-bold text-xs uppercase tracking-widest hover:bg-[#f5c46b] transition-all transform hover:scale-[1.01] shadow-[0_0_25px_rgba(229,169,60,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <>
                    <span>Confirm Order</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
