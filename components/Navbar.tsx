'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Shield, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartTotalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-amber-900/10">
      {/* Top Banner */}
      <div className="bg-amber-800 text-amber-50 text-xs py-2 px-4 text-center font-medium tracking-wide">
        🍯 Free delivery on all orders over $50 • Use code <span className="underline font-bold text-amber-200">GOLDEN2026</span> for 10% off
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-amber-950 hover:text-amber-700 transition-colors">
            Home
          </Link>
          <Link href="/#catalog" className="text-sm font-semibold text-amber-900/80 hover:text-amber-700 transition-colors">
            Our Honey
          </Link>
          <Link href="/#features" className="text-sm font-semibold text-amber-900/80 hover:text-amber-700 transition-colors">
            Hive to Jar
          </Link>
          <Link href="/#footer" className="text-sm font-semibold text-amber-900/80 hover:text-amber-700 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-amber-100/70 hover:bg-amber-200/80 text-amber-900 transition-colors flex items-center justify-center border border-amber-200"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-amber-800" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-700 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-amber-100/70 text-amber-900 hover:bg-amber-200 transition-colors border border-amber-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-amber-900/10 px-6 py-6 space-y-4 shadow-xl">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-950 hover:text-amber-700"
          >
            Home
          </Link>
          <Link 
            href="/#catalog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-900/80 hover:text-amber-700"
          >
            Our Honey
          </Link>
          <Link 
            href="/#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-900/80 hover:text-amber-700"
          >
            Hive to Jar
          </Link>
          <Link 
            href="/#footer" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-900/80 hover:text-amber-700"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
