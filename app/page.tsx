import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, Heart, Star, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCatalog from '@/components/ProductCatalog';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-amber-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-[#FFFDF9] to-amber-100/30 pt-16 pb-24 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                100% Pure Raw & Artisanal Honey
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight text-amber-950 mb-6 leading-[1.1]">
                Golden Nectar <span className="italic font-normal text-amber-600">Harvested</span> with Care
              </h1>

              <p className="text-lg text-amber-900/80 mb-8 max-w-xl leading-relaxed">
                Experience nature's purest liquid gold. Sustainably sourced from pristine wildflower meadows and remote organic apiaries, unheated and unfiltered.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#catalog"
                  className="px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-amber-700/20 flex items-center gap-2 group"
                >
                  Explore Honey Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products/golden-reserve-raw-wildflower-honey"
                  className="px-8 py-4 bg-white hover:bg-amber-50 text-amber-900 font-semibold rounded-2xl border border-amber-200 transition-all shadow-xs"
                >
                  View Reserve Honey
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-amber-900/10 w-full">
                <div>
                  <div className="text-2xl font-black text-amber-950 font-serif">4.9/5</div>
                  <div className="text-xs text-amber-800/70 font-medium mt-0.5">Over 5,000+ Happy Foodies</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-950 font-serif">100%</div>
                  <div className="text-xs text-amber-800/70 font-medium mt-0.5">Raw & Unfiltered</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-950 font-serif">Single</div>
                  <div className="text-xs text-amber-800/70 font-medium mt-0.5">Origin Apiaries</div>
                </div>
              </div>
            </div>

            {/* Right visual showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-100 bg-amber-950 group">
                <Image
                  src="https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800"
                  alt="Golden Reserve Raw Wildflower Honey"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <span className="text-amber-300 font-semibold text-xs tracking-wider uppercase mb-1">Master Beekeeper Reserve</span>
                  <h3 className="text-white text-2xl font-serif font-bold">Golden Reserve Raw Wildflower</h3>
                  <p className="text-amber-200/90 text-sm mt-1">$34.99 • Unfiltered Alpine Nectar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Catalog Section */}
      <div id="catalog">
        <ProductCatalog />
      </div>

      {/* Feature Callout Banner */}
      <section id="features" className="py-20 bg-[#2C221E] text-amber-50 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">From Blossom to Jar</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white mt-1 mb-6">
                Ethical beekeeping for the health of the hive and your table
              </h2>
              <p className="text-amber-200/70 text-base leading-relaxed mb-8">
                We work directly with generational apiarists who practice pesticide-free, bee-first beekeeping. Our honey is gently extracted without high-heat pasteurization, ensuring all live enzymes, vitamins, and delicate aromas remain completely intact.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-500/20 text-amber-400 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Never Heated or Pasteurized</h4>
                    <p className="text-xs text-amber-200/60 mt-0.5">Preserving raw natural enzymes, amino acids, and active pollen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-500/20 text-amber-400 mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Sustainable & Bee-Friendly</h4>
                    <p className="text-xs text-amber-200/60 mt-0.5">We leave ample honey in every hive so colonies thrive naturally year-round.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-amber-900/50 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"
                alt="Honeycomb & Natural Beekeeping"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
