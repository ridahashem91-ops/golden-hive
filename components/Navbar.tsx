'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Shield, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {
  const { cartTotalCount, setIsCartOpen } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo and Home Link */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-amber-600/20 group-hover:scale-105 transition-transform border border-amber-400/30">
              🐝
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-amber-950 tracking-tight leading-none">{t('brandName')}</span>
              <span className="text-[10px] font-semibold text-amber-700 tracking-widest uppercase mt-0.5">{t('brandSubtitle')}</span>
            </div>
          </Link>

          <div className="pl-3 border-l border-amber-900/10 hidden sm:flex items-center gap-4">
            <Link href="/#home" className="text-sm font-semibold text-amber-950 hover:text-amber-700 transition-colors">
              {t('home')}
            </Link>
            <Link href="/products" className="text-sm font-semibold text-amber-900/80 hover:text-amber-700 transition-colors">
              {t('products')}
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Links, Language Switcher, Cart Icon & Mobile Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/order" className="text-sm font-semibold text-amber-900/80 hover:text-amber-700 transition-colors">
              {t('customerOrder')}
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-amber-900/80 hover:text-amber-700 transition-colors">
              {t('contactUs')}
            </Link>
            <Link href="/feedback" className="text-sm font-semibold text-amber-900/80 hover:text-amber-700 transition-colors">
              {t('feedbackRates')}
            </Link>
          </nav>

          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl bg-amber-100/70 hover:bg-amber-200/80 text-amber-900 transition-colors flex items-center justify-center border border-amber-200 group"
            aria-label={t('cart')}
          >
            <ShoppingBag className="w-4 h-4 text-amber-800 group-hover:scale-110 transition-transform" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-amber-100/70 text-amber-900 hover:bg-amber-200 transition-colors border border-amber-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-amber-900/10 px-6 py-6 space-y-4 shadow-xl">
          <div className="py-2 flex justify-center">
            <LanguageSwitcher />
          </div>
          <Link 
            href="/#home" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-950 hover:text-amber-700"
          >
            {t('home')}
          </Link>
          <Link 
            href="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-900/80 hover:text-amber-700"
          >
            {t('products')}
          </Link>
          <Link 
            href="/order" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-900/80 hover:text-amber-700"
          >
            {t('customerOrder')}
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-900/80 hover:text-amber-700"
          >
            {t('contactUs')}
          </Link>
          <Link 
            href="/feedback" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-amber-900/80 hover:text-amber-700"
          >
            {t('feedbackRates')}
          </Link>
        </div>
      )}
    </header>
  );
}
