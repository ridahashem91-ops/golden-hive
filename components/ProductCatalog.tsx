'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Honeys');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(100);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Honeys' || product.category === selectedCategory;
      const matchesStock = inStockOnly ? product.inStock : true;
      const matchesPrice = product.price <= priceRange;

      return matchesSearch && matchesCategory && matchesStock && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, sortBy, inStockOnly, priceRange]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Honeys');
    setSortBy('featured');
    setInStockOnly(false);
    setPriceRange(100);
  };

  return (
    <section id="catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-amber-700 font-semibold text-sm tracking-wider uppercase">Artisanal Selection</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-amber-950 mt-1">
            Explore Our Pure Honeys
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/50" />
          <input
            type="text"
            placeholder="Search honeys & elixirs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/15 rounded-xl text-sm text-amber-950 placeholder:text-amber-900/40 focus:outline-hidden focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all shadow-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-900/40 hover:text-amber-950"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 shadow-xs ${
              selectedCategory === category
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white text-amber-900/80 border border-amber-900/15 hover:bg-amber-50 hover:text-amber-950'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-amber-900/10 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-6">
          {/* Stock Filter */}
          <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-amber-900">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded text-amber-700 focus:ring-amber-600 border-amber-300"
            />
            In Stock Only
          </label>

          {/* Price Range Filter */}
          <div className="flex items-center gap-3 text-sm text-amber-900">
            <span className="font-medium">Max Price: ${priceRange}</span>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-32 accent-amber-700 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Sorting */}
          <div className="flex items-center gap-2 text-sm text-amber-900">
            <ArrowUpDown className="w-4 h-4 text-amber-700/50" />
            <span className="font-medium">Sort by:</span>
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

          {(selectedCategory !== 'All Honeys' || searchQuery || inStockOnly || priceRange < 100) && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-4"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            We couldn't find any honeys matching your current filter criteria. Try resetting your filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-xl transition-all shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
}
