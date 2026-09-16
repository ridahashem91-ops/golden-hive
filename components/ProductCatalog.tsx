'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product, PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCatalogProps {
  products?: Product[];
}

export default function ProductCatalog({ products = PRODUCTS }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(100);

  // Extract exactly two existing product categories
  const twoCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return cats.slice(0, 2);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStock = inStockOnly ? product.inStock : true;
      const matchesPrice = product.price <= priceRange;

      return matchesSearch && matchesCategory && matchesStock && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, sortBy, inStockOnly, priceRange]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSortBy('featured');
    setInStockOnly(false);
    setPriceRange(100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Grid Layout: Left Content (Search, Categories, Products), Right Sidebar (Hive to Jar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 1. Left / Main Content Area */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          {/* Prominent Search Bar near top */}
          <div>
            <div className="max-w-3xl mb-6">
              <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase mb-2 block">Find Your Favorite Nectar</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-amber-950">
                Artisanal Honey Catalog
              </h2>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700/60" />
              <input
                type="text"
                placeholder="Search products by name in real time..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-amber-900/15 rounded-2xl text-base text-amber-950 placeholder:text-amber-900/40 focus:outline-hidden focus:ring-4 focus:ring-amber-600/20 focus:border-amber-700 transition-all shadow-md"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Buttons (Two categories + View All) */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-xs ${
                !selectedCategory
                  ? 'bg-amber-700 text-white shadow-md ring-2 ring-amber-700/30'
                  : 'bg-white text-amber-900/80 border border-amber-900/20 hover:bg-amber-50 hover:text-amber-950'
              }`}
            >
              All Products
            </button>
            {twoCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-xs ${
                  selectedCategory === cat
                    ? 'bg-amber-700 text-white shadow-md ring-2 ring-amber-700/30'
                    : 'bg-white text-amber-900/80 border border-amber-900/20 hover:bg-amber-50 hover:text-amber-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter & Sort Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-amber-900/10 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-amber-900">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 border-amber-300"
                />
                In Stock Only
              </label>

              <div className="flex items-center gap-3 text-sm text-amber-900">
                <span className="font-medium">Max Price: ${priceRange}</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-28 accent-amber-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-amber-900">
                <ArrowUpDown className="w-4 h-4 text-amber-700/50" />
                <span className="font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-amber-50/50 border border-amber-900/15 rounded-lg px-3 py-1.5 text-sm font-medium text-amber-950 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {(selectedCategory !== null || searchQuery || inStockOnly || priceRange < 100) && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-4"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/10 shadow-xs">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 text-amber-700 mb-4">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-amber-950 mb-1">No honeys found</h3>
              <p className="text-amber-900/75 text-sm max-w-sm mx-auto mb-6">
                We couldn't find any honeys matching your search or filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-xl transition-all shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* 2. Hive to Jar Promotional Area (Far Right Sidebar, starting from top behind search) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
          <div className="bg-[#2C221E] text-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-900/40 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-600/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-800/50 text-amber-400 text-[11px] font-semibold tracking-wide uppercase mb-4 shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Hive to Jar Journey
            </div>

            <h3 className="text-2xl font-serif font-bold tracking-tight text-white mb-3 leading-snug">
              Ethical beekeeping for hive & table
            </h3>

            <p className="text-amber-200/80 text-sm leading-relaxed mb-5">
              Pesticide-free, bee-first beekeeping. Gently extracted without high-heat pasteurization to preserve all live enzymes, pollens, and raw floral aromas.
            </p>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-amber-900/50 shadow-md mb-5">
              <Image
                src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800"
                alt="Honeycomb & Natural Beekeeping"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-950/40 border border-amber-900/40">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Never Heated (Raw)</strong>
                  <span className="text-amber-200/70">Retains 100% of natural enzymes & pollen.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-950/40 border border-amber-900/40">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Bee-First & Ethical</strong>
                  <span className="text-amber-200/70">Colonies thrive with sustainable foraging.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-950/40 border border-amber-900/40">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Single-Origin Reserve</strong>
                  <span className="text-amber-200/70">Harvested from remote pristine meadows.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-950/40 border border-amber-900/40">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Zero Artificial Additives</strong>
                  <span className="text-amber-200/70">As pure and untouched as nature intended.</span>
                </div>
              </div>
            </div>

            <Link
              href="#catalog"
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group text-center"
            >
              Taste the Pure Nectar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
