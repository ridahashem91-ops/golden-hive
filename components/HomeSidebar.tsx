'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home as HomeIcon, Mail, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function HomeSidebar() {
  const { cartTotalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-900/10 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-base shadow-md">
              🐝
            </div>
            <span className="font-serif font-bold text-lg text-amber-950">Golden Hive</span>
          </Link>

          {/* Home Link & Cart Icon inline at the same level */}
          <div className="flex items-center gap-2 pl-2 border-l border-amber-900/10">
            <Link
              href="#home"
              className="text-xs font-semibold text-amber-950 hover:text-amber-700 transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 rounded-lg bg-amber-100/70 text-amber-900 hover:bg-amber-200 transition-colors flex items-center justify-center border border-amber-200 group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-800 group-hover:scale-110 transition-transform" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-amber-100/70 text-amber-900 hover:bg-amber-200 transition-colors border border-amber-200"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[61px] z-50 bg-[#FFFDF9] border-b border-amber-900/10 px-6 py-5 space-y-4 shadow-xl">
          <Link
            href="#footer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-base font-semibold text-amber-950 hover:text-amber-700 py-2"
          >
            <Mail className="w-5 h-5 text-amber-700" />
            Contact Us
          </Link>
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#FFFDF9] border-r border-amber-900/10 p-6 sticky top-0 h-screen overflow-y-auto justify-between">
        <div className="space-y-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-amber-600/20 group-hover:scale-105 transition-transform border border-amber-400/30">
              🐝
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-amber-950 tracking-tight leading-none">Golden Hive</span>
              <span className="text-[10px] font-semibold text-amber-700 tracking-widest uppercase mt-0.5">Artisanal Honey Co.</span>
            </div>
          </Link>

          {/* Vertical Navigation (Home with Cart icon under it) */}
          <nav className="space-y-3">
            <div className="text-[11px] font-bold text-amber-800/50 uppercase tracking-wider px-3 mb-2">
              Navigation
            </div>
            <div className="space-y-2">
              <Link
                href="#home"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-950 hover:bg-amber-100/70 hover:text-amber-800 transition-all group"
              >
                <HomeIcon className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
                Home
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-full px-4 py-3 rounded-xl bg-amber-100/70 hover:bg-amber-200/80 text-amber-900 transition-colors flex items-center justify-center gap-2 border border-amber-200 group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6 text-amber-800 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Cart</span>
                {cartTotalCount > 0 && (
                  <span className="absolute top-2.5 right-3 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartTotalCount}
                  </span>
                )}
              </button>
            </div>
            <Link
              href="#footer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-amber-900/80 hover:bg-amber-100/70 hover:text-amber-800 transition-all group"
            >
              <Mail className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-amber-900/10 space-y-4">
          <div className="text-[11px] text-amber-900/60 text-center font-medium">
            © 2026 Golden Hive Co.
          </div>
        </div>
      </aside>
    </>
  );
}
