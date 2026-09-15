'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { recordSaleAndReduceStock } from '@/lib/firebaseSales';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartSubtotal, cartTotalCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shippingFee = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 8.99;
  const tax = cartSubtotal * 0.05;
  const grandTotal = cartSubtotal + shippingFee + tax;
  const freeShippingThreshold = 50;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await recordSaleAndReduceStock(cart, cartSubtotal, shippingFee, tax, grandTotal);
    } catch (e) {
      console.error('Failed to record sale during checkout:', e);
    } finally {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-amber-950/50 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setOrderComplete(false);
        }}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col border-l border-amber-900/10">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-amber-900/10 bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg font-serif font-bold text-amber-950">Your Hive Cart</h2>
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartTotalCount}
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setOrderComplete(false);
              }}
              className="p-2 text-amber-900/50 hover:text-amber-950 rounded-xl hover:bg-amber-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {!orderComplete && cart.length > 0 && (
            <div className="bg-amber-100/60 px-6 py-3 border-b border-amber-900/10">
              <div className="flex items-center justify-between text-xs font-medium text-amber-900 mb-1.5">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">You unlocked Free Shipping!</span>
                  ) : (
                    <span>Add <strong className="text-amber-950">${amountNeededForFreeShipping.toFixed(2)}</strong> more for Free Shipping</span>
                  )}
                </span>
                <span>{freeShippingProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-600 transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {orderComplete ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-950 mb-2">Order Placed Successfully!</h3>
                <p className="text-amber-900/70 text-sm max-w-xs mb-6">
                  Thank you for supporting sustainable beekeeping! We've sent your order confirmation and tracking details via email.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-3 bg-amber-700 text-white font-medium rounded-xl hover:bg-amber-800 transition-colors shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif font-bold text-amber-950 mb-1">Your hive cart is empty</h3>
                <p className="text-amber-900/70 text-sm max-w-xs mb-6">
                  Explore our collection of raw wildflower honey, manuka elixirs, and artisanal gift sets.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-amber-700 text-white text-sm font-medium rounded-xl hover:bg-amber-800 transition-colors shadow-sm"
                >
                  Explore Honey Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex gap-4 p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs">
                    <div className="relative w-20 h-20 bg-amber-50 rounded-xl overflow-hidden shrink-0 border border-amber-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-semibold text-amber-950 text-sm line-clamp-1">{item.product.name}</h4>
                          <div className="text-xs text-amber-800/70 mt-0.5 space-x-2">
                            {item.selectedSize && <span>{item.selectedSize}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-amber-900/40 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-amber-50 rounded-lg border border-amber-200 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-amber-900 hover:text-amber-950"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-amber-950 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-amber-900 hover:text-amber-950"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-amber-950 text-sm font-serif">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {!orderComplete && cart.length > 0 && (
            <div className="border-t border-amber-900/10 p-6 bg-white">
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-amber-900/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-amber-950">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-900/80">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-amber-950">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">Free</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-amber-900/80">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-amber-950">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-amber-900/10 flex justify-between text-base font-bold text-amber-950 font-serif">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl shadow-md shadow-amber-700/20 transition-all flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Secure Order...
                  </span>
                ) : (
                  <>
                    Proceed to Secure Checkout
                    <ArrowRight className="w-4 h-4" />
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
