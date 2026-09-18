'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Shield, Award, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ProductCatalog from '@/components/ProductCatalog';
import FeedbackSection from '@/components/FeedbackSection';
import { Product } from '@/data/products';

export default function HomeContent({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* 1. Compact Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-[#FFFDF9] to-[#FFFDF9] pt-2.5 pb-3.5 lg:pt-3.5 lg:pb-5 px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 flex flex-col items-start text-start">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-[10px] font-semibold tracking-wide uppercase mb-2 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {t('rawAndUnfiltered')}
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold tracking-tight text-amber-950 mb-2 leading-[1.1]">
                {t('heroTitle')}
              </h1>

              <p className="text-xs sm:text-sm text-amber-900/80 mb-3 max-w-xl leading-relaxed">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="#catalog"
                  className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-all shadow-md shadow-amber-700/20 flex items-center gap-1.5 group text-xs"
                >
                  {t('exploreCollection')}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </Link>
                <Link
                  href="/products/golden-reserve-raw-wildflower-honey"
                  className="px-3.5 py-1.5 bg-white hover:bg-amber-50 text-amber-900 font-semibold rounded-lg border border-amber-200 transition-all shadow-xs text-xs"
                >
                  {t('featuredHoney')}
                </Link>
              </div>
            </div>

            {/* Right visual showcase */}
            <div className="lg:col-span-5 relative max-w-xs sm:max-w-sm lg:max-w-none mx-auto w-full">
              <div className="relative aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden shadow-md border-2 border-amber-100 bg-amber-950 group">
                <Image
                  src="https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800"
                  alt="Golden Reserve Raw Wildflower Honey"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/85 via-amber-950/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
                  <span className="text-amber-300 font-semibold text-[10px] tracking-wider uppercase mb-0.5">Master Beekeeper Reserve</span>
                  <h3 className="text-white text-base sm:text-lg font-serif font-bold">Golden Reserve Raw Wildflower</h3>
                  <p className="text-amber-200/90 text-[11px] mt-0.5">$34.99 • Unfiltered Alpine Nectar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Products Section */}
      <section id="catalog-section" className="py-12 lg:py-16 bg-amber-50/30 px-4 sm:px-6 lg:px-8">
        <div id="catalog" className="scroll-mt-24">
          <ProductCatalog products={products} />
        </div>
      </section>

      {/* 3. Feedback Section */}
      <FeedbackSection />
    </div>
  );
}
