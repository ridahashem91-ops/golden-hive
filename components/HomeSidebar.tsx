'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home as HomeIcon, Mail, ShoppingBag, Menu, X, Sparkles, User, MessageSquare, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomeSidebar() {
  const { cartTotalCount, setIsCartOpen } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-900/10 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shadow-md overflow-hidden relative">
              <Image src="/logo.jpg" alt="Propolis.lb Logo" fill className="object-cover" />
            </div>
            <span className="font-serif font-bold text-lg text-amber-950">{t('brandName')}</span>
          </Link>

          <div className="pl-2 border-l border-amber-900/10 hidden sm:block">
            <Link
              href="/#home"
              className="text-xs font-semibold text-amber-950 hover:text-amber-700 transition-colors"
            >
              {t('home')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 rounded-lg bg-amber-100/70 text-amber-900 hover:bg-amber-200 transition-colors flex items-center justify-center border border-amber-200 group"
            aria-label={t('cart')}
          >
            <ShoppingBag className="w-4 h-4 text-amber-800 group-hover:scale-110 transition-transform" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                {cartTotalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-amber-100/70 text-amber-900 hover:bg-amber-200 transition-colors border border-amber-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[61px] z-50 bg-[#FFFDF9] border-b border-amber-900/10 px-6 py-5 space-y-4 shadow-xl">
          <div className="py-2 border-b border-amber-900/10 pb-4">
            <LanguageSwitcher />
          </div>
          <Link
            href="/#home"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-base font-semibold text-amber-950 hover:text-amber-700 py-2"
          >
            <HomeIcon className="w-5 h-5 text-amber-700" />
            {t('home')}
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-base font-semibold text-amber-950 hover:text-amber-700 py-2"
          >
            <Package className="w-5 h-5 text-amber-700" />
            {t('products')}
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="flex items-center justify-between text-base font-semibold text-amber-950 hover:text-amber-700 py-2 w-full text-left"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <span>{t('cart')}</span>
            </div>
            {cartTotalCount > 0 && (
              <span className="bg-amber-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartTotalCount}
              </span>
            )}
          </button>
          <Link
            href="/order"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-base font-semibold text-amber-950 hover:text-amber-700 py-2"
          >
            <User className="w-5 h-5 text-amber-700" />
            {t('customerOrder')}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-base font-semibold text-amber-950 hover:text-amber-700 py-2"
          >
            <Mail className="w-5 h-5 text-amber-700" />
            {t('contactUs')}
          </Link>
          <Link
            href="/feedback"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-base font-semibold text-amber-950 hover:text-amber-700 py-2"
          >
            <MessageSquare className="w-5 h-5 text-amber-700" />
            {t('feedbackRates')}
          </Link>
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-52 shrink-0 bg-[#FFFDF9] border-r border-amber-900/15 p-3.5 sticky top-0 h-screen overflow-y-auto justify-between">
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-amber-400/30 overflow-hidden relative">
              <Image src="/logo.jpg" alt="Propolis.lb Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-base text-amber-950 tracking-tight leading-tight truncate">{t('brandName')}</span>
              <span className="text-[9px] font-semibold text-amber-700 tracking-wider uppercase">{t('brandSubtitle')}</span>
            </div>
          </Link>

          {/* Language Button Above the Pages Navigation */}
          <div className="px-0.5">
            <LanguageSwitcher />
          </div>

          {/* Vertical Navigation (Pages Buttons) */}
          <nav className="space-y-2.5">
            <div className="space-y-1.5">
              <Link
                href="/#home"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-950 hover:bg-amber-100/70 hover:text-amber-800 transition-all group"
              >
                <HomeIcon className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                {t('home')}
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-900/80 hover:bg-amber-100/70 hover:text-amber-800 transition-all group"
              >
                <Package className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                {t('products')}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-950 hover:bg-amber-100/70 hover:text-amber-800 transition-all group w-full text-left"
                aria-label={t('cart')}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                <span>{t('cart')}</span>
                {cartTotalCount > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-700 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                    {cartTotalCount}
                  </span>
                )}
              </button>
              <Link
                href="/order"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-900/80 hover:bg-amber-100/70 hover:text-amber-800 transition-all group"
              >
                <User className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                {t('customerOrder')}
              </Link>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-amber-900/80 hover:bg-amber-100/70 hover:text-amber-800 transition-all group"
            >
              <Mail className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
              {t('contactUs')}
            </Link>
            <Link
              href="/feedback"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-amber-900/80 hover:bg-amber-100/70 hover:text-amber-800 transition-all group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
              {t('feedbackRates')}
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-amber-900/10 space-y-2">
          <div className="text-[10px] text-amber-900/60 text-center font-medium">
            © 2026 Golden Hive Co.
          </div>
        </div>
      </aside>
    </>
  );
}
