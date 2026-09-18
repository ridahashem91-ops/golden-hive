'use client';

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product, PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface ProductCatalogProps {
  products?: Product[];
}

export default function ProductCatalog({ products = PRODUCTS }: ProductCatalogProps) {
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
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStock = inStockOnly ? product.inStock : true;
      const matchesPrice = product.price <= priceRange;

      return matchesCategory && matchesStock && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, sortBy, inStockOnly, priceRange]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSortBy('featured');
    setInStockOnly(false);
    setPriceRange(100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Content Area */}
      <div className="space-y-8">
        <div>
          <div className="max-w-3xl mb-6">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase mb-2 block">Find Your Favorite Nectar</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-amber-950">
              Artisanal Honey Catalog
            </h2>
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

            {(selectedCategory !== null || inStockOnly || priceRange < 100) && (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
              We couldn't find any honeys matching your filter criteria.
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
    </div>
  );
}
