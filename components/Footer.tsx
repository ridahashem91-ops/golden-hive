'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Heart, Sparkles, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-amber-950 text-amber-100 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shadow-md border border-amber-300/40 overflow-hidden relative">
                <Image src="/logo.jpg" alt="Propolis.lb Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white tracking-tight">{t('brandName')}</span>
                <span className="text-[10px] text-amber-300 font-medium tracking-widest uppercase">{t('brandSubtitle')}</span>
              </div>
            </Link>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              {t('footerBrandDesc')}
            </p>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t('productsNavigation')}</h4>
            <ul className="space-y-2 text-sm text-amber-200/80">
              <li>
                <Link href="/products" className="hover:text-amber-100 transition-colors flex items-center gap-1.5">
                  <span>✨</span> {t('products')} {t('catalog') || 'Catalog'}
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-amber-100 transition-colors flex items-center gap-1.5">
                  <span>🍯</span> {t('customerOrder')}
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-amber-100 transition-colors flex items-center gap-1.5">
                  <span>⭐</span> {t('feedbackRates')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t('contactUs')}</h4>
            <ul className="space-y-2 text-sm text-amber-200/80">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('apiariesLocation')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 555-HONEY</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>care@goldenhive.com</span>
              </li>
              <li>
                <Link href="/contact" className="inline-block mt-1 text-amber-300 hover:underline font-semibold text-xs">
                  {t('sendAMessageLink')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quality Promise */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{t('pureGuarantee')}</h4>
            <div className="p-4 rounded-2xl bg-amber-900/50 border border-amber-800/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-200 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('unprocessedAndRaw')}</span>
              </div>
              <p className="text-[11px] text-amber-300/70">
                {t('pureGuaranteeDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/60 gap-4">
          <p>© {new Date().getFullYear()} {t('brandName')}. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-amber-200 transition-colors">{t('privacyPolicy')}</Link>
            <Link href="/contact" className="hover:text-amber-200 transition-colors">{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
