'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { translateProduct } from '@/lib/dictionary';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const translatedProduct = translateProduct(product, language);

  const discountPercentage = translatedProduct.originalPrice 
    ? Math.round(((translatedProduct.originalPrice - translatedProduct.price) / translatedProduct.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white rounded-3xl border border-amber-900/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badge container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discountPercentage && (
          <span className="bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
            -{discountPercentage}%
          </span>
        )}
        {translatedProduct.isFeatured && (
          <span className="bg-amber-950 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
            Reserve
          </span>
        )}
      </div>

      {/* Image container */}
      <Link href={`/products/${translatedProduct.slug}`} className="relative aspect-square bg-amber-50 overflow-hidden block">
        <Image 
          src={translatedProduct.image} 
          alt={translatedProduct.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {!translatedProduct.inStock && (
          <div className="absolute inset-0 bg-amber-950/40 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-white/90 text-amber-950 font-medium text-sm px-4 py-2 rounded-full shadow-sm">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Content container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold tracking-wider text-amber-700/80 uppercase mb-1">
          {translatedProduct.category}
        </div>

        <Link href={`/products/${translatedProduct.slug}`} className="block">
          <h3 className="font-serif font-semibold text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-1 text-base mb-1.5">
            {translatedProduct.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xs font-medium text-amber-900">{translatedProduct.rating}</span>
          <span className="text-xs text-amber-800/50">({translatedProduct.reviewsCount})</span>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-3 border-t border-amber-900/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-amber-950 font-serif">
              ${translatedProduct.price.toFixed(2)}
            </span>
            {translatedProduct.originalPrice && (
              <span className="text-sm text-amber-900/40 line-through font-normal">
                ${translatedProduct.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(translatedProduct)}
            disabled={!translatedProduct.inStock}
            className={`p-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
              translatedProduct.inStock
                ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-xs hover:shadow-md'
                : 'bg-amber-100 text-amber-400 cursor-not-allowed'
            }`}
            title={translatedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
