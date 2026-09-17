'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Phone, MapPin, ShoppingBag, Sparkles, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import HomeSidebar from '@/components/HomeSidebar';
import { useCart } from '@/context/CartContext';
import { recordSaleAndReduceStock } from '@/lib/firebaseSales';

export default function OrderPage() {
  const { cart, cartTotalCount, cartSubtotal, clearCart } = useCart();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [whatsappUrlState, setWhatsappUrlState] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!locationAddress.trim()) {
      setErrorMessage('Please write or select your delivery location.');
      return;
    }
    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before ordering.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const deliveryCost = 5.0; // Standard delivery fee
      const grandTotal = cartSubtotal + deliveryCost;

      const orderId = await recordSaleAndReduceStock(
        cart,
        cartSubtotal,
        deliveryCost,
        0,
        grandTotal
      );

      // Send process and order information to WhatsApp
      const itemsText = cart.map(item => `- ${item.product.name} (Qty: ${item.quantity}) @ $${item.product.price.toFixed(2)}`).join('\n');
      const whatsappMessage = `*New Customer Order* 🐝\n\n*Order ID:* ${orderId}\n*Customer Name:* ${fullName}\n*Phone:* ${phone}\n*Delivery Location:* ${locationAddress}\n\n*Items Ordered:*\n${itemsText}\n\n*Subtotal:* $${cartSubtotal.toFixed(2)}\n*Delivery Fee:* $${deliveryCost.toFixed(2)}\n*Grand Total:* $${grandTotal.toFixed(2)}\n\n*Process Status:* Order placed, recorded in database, and stock updated.`;

      const whatsappUrl = `https://wa.me/96171725664?text=${encodeURIComponent(whatsappMessage)}`;
      setWhatsappUrlState(whatsappUrl);
      
      try {
        window.open(whatsappUrl, '_blank');
      } catch (e) {
        console.error('Popup blocked:', e);
      }

      setOrderSuccess(orderId);
      clearCart();
    } catch (err: any) {
      console.error('Failed to submit order:', err);
      setErrorMessage(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col lg:flex-row text-amber-950">
      {/* Left Sidebar Navigation */}
      <HomeSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col justify-start">
        {/* Header Banner */}
        <section className="bg-gradient-to-b from-amber-50/70 via-[#FFFDF9] to-[#FFFDF9] py-6 lg:py-8 px-4 sm:px-6 lg:px-8 border-b border-amber-900/15">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Customer Profile & Order
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-amber-950 mb-2">
              Complete Your <span className="italic font-normal text-amber-600">Order Profile</span>
            </h1>
            <p className="text-xs sm:text-sm text-amber-950/80 max-w-xl mx-auto leading-relaxed">
              Verify your customer details, review ordered items, and specify your delivery location.
            </p>
          </div>
        </section>

        {/* Form & Content Section */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          {orderSuccess ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200 shadow-xl text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
                Order Placed Successfully!
              </h2>
              <p className="text-amber-900/80 max-w-md mx-auto text-sm sm:text-base">
                Thank you, <span className="font-semibold text-amber-950">{fullName}</span>. Your order (<span className="font-mono font-bold text-amber-700">{orderSuccess}</span>) has been recorded and our delivery team is preparing your artisanal honey.
              </p>

              {whatsappUrlState && (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 inline-flex flex-col items-center gap-3 max-w-md mx-auto w-full shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Send Order to WhatsApp (+961 71 725 664)</span>
                  </div>
                  <a
                    href={whatsappUrlState}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-md w-full justify-center"
                  >
                    <span>Open WhatsApp Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {locationAddress && (
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 inline-flex flex-col items-center gap-2 max-w-md mx-auto w-full">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    Delivery Location: {locationAddress}
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-amber-900 hover:bg-amber-950 text-white font-semibold rounded-2xl text-sm transition-all shadow-md"
                >
                  Return to Home
                </Link>
                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    setFullName('');
                    setPhone('');
                    setLocationAddress('');
                  }}
                  className="px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded-2xl text-sm transition-all"
                >
                  Place Another Order
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Form (2 Cols) */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-lg shadow-amber-900/5">
                <h2 className="text-xl font-serif font-bold text-amber-950 mb-6 pb-4 border-b border-amber-900/10 flex items-center gap-2.5">
                  <User className="w-5 h-5 text-amber-700" />
                  Customer Profile & Delivery
                </h2>

                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs sm:text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-700/60">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Sarah Al-Ahmad"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#FFFDF9] border border-amber-200 rounded-2xl text-amber-950 placeholder:text-amber-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-700/60">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +961 70 123 456"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#FFFDF9] border border-amber-200 rounded-2xl text-amber-950 placeholder:text-amber-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Number of Items (Display/Info) */}
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                      Number of Items in Order
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-700/60">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        readOnly
                        value={`${cartTotalCount} item${cartTotalCount === 1 ? '' : 's'} in cart`}
                        className="w-full pl-10 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-2xl text-amber-950 font-semibold text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                      Delivery Address / Location *
                    </label>

                    <div className="relative">
                      <div className="absolute top-3.5 left-3.5 flex items-center pointer-events-none text-amber-700/60">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <textarea
                        rows={3}
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                        placeholder="Write your delivery address or landmarks (e.g. Beirut, Hamra Street, Golden Tower, 4th Floor)..."
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#FFFDF9] border border-amber-200 rounded-2xl text-amber-950 placeholder:text-amber-900/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-2xl transition-all shadow-md shadow-amber-600/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Processing Order...</span>
                    ) : (
                      <>
                        <span>Submit Profile & Order (${(cartSubtotal + 5.0).toFixed(2)})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Order Summary Sidebar (1 Col) */}
              <div className="bg-amber-50/50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-amber-950 mb-4 pb-3 border-b border-amber-900/10 flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-200/60 rounded-full text-amber-900">
                      {cartTotalCount} items
                    </span>
                  </h3>

                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-amber-900/60 text-sm">
                      Your cart is empty. <Link href="/" className="text-amber-700 underline font-semibold">Browse products</Link>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1">
                      {cart.map((item, idx) => (
                        <div key={`${item.product.id}-${idx}`} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/60 shadow-xs">
                          {item.product.image ? (
                            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl border border-amber-100" />
                          ) : (
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-bold text-xs">🐝</div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-amber-950 text-xs truncate">{item.product.name}</h4>
                            <p className="text-[11px] text-amber-900/70">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</p>
                          </div>
                          <span className="text-xs font-bold text-amber-950">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t border-amber-900/10 text-xs sm:text-sm">
                  <div className="flex justify-between text-amber-900/80">
                    <span>Subtotal</span>
                    <span className="font-semibold text-amber-950">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-900/80">
                    <span>Standard Delivery</span>
                    <span className="font-semibold text-amber-950">$5.00</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-amber-950 pt-2 border-t border-amber-900/10">
                    <span>Grand Total</span>
                    <span className="text-amber-700">${(cartSubtotal + (cart.length > 0 ? 5.0 : 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
