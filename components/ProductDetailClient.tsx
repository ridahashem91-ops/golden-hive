'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight, 
  Minus, 
  Plus,
  ArrowLeft
} from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250g Glass Jar');
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'shipping'>('description');
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  const sizes = [
    { name: '250g Glass Jar', priceOffset: 0 },
    { name: '500g Family Jar', priceOffset: 12 },
    { name: '1kg Bulk Honeycomb Tin', priceOffset: 28 }
  ];

  const currentPrice = product.price + (sizes.find(s => s.name === selectedSize)?.priceOffset || 0);

  const handleAddToCart = () => {
    // Add custom modified product with selected size & adjusted price if needed
    const customizedProduct = {
      ...product,
      price: currentPrice
    };
    addToCart(customizedProduct, quantity, undefined, selectedSize);
    setAddedSuccessfully(true);
    setTimeout(() => setAddedSuccessfully(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 px-4 sm:px-6 lg:px-8 text-amber-950">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-amber-800/70 mb-8">
          <Link href="/" className="hover:text-amber-700 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
          <ChevronRight className="w-4 h-4 text-amber-700/40" />
          <span className="text-amber-950 font-medium truncate">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl border border-amber-900/10 p-6 sm:p-10 shadow-xs mb-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-amber-50 rounded-2xl overflow-hidden border border-amber-100">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-cover object-center transition-all duration-300"
              />
              {product.originalPrice && (
                <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-amber-600 ring-2 ring-amber-600/20' : 'border-amber-900/10 hover:border-amber-300'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover object-center" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Actions */}
          <div className="flex flex-col">
            <div className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-2">
              {product.category}
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-amber-950 mb-3">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-semibold text-amber-950">{product.rating}</span>
              <span className="text-sm text-amber-950/50">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-amber-900/10">
              <span className="text-3xl font-extrabold text-amber-950 font-serif">
                ${currentPrice.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-amber-900/40 line-through">
                  ${(product.originalPrice + (currentPrice - product.price)).toFixed(2)}
                </span>
              )}
              <span className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full ${
                product.inStock ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {product.inStock ? 'In Stock & Freshly Jarred' : 'Sold Out'}
              </span>
            </div>

            <p className="text-amber-900/80 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size / Jar Selection */}
            <div className="mb-8">
              <label className="block text-xs font-semibold text-amber-900 uppercase tracking-wider mb-2.5">
                Jar Size & Option: <span className="font-normal text-amber-700">{selectedSize}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sizes.map(size => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-3 rounded-xl text-xs font-medium transition-all text-left flex flex-col justify-between ${
                      selectedSize === size.name
                        ? 'bg-amber-700 text-white shadow-sm ring-2 ring-amber-600/30'
                        : 'bg-amber-50/50 text-amber-900 hover:bg-amber-100/70 border border-amber-900/15'
                    }`}
                  >
                    <span className="font-semibold">{size.name}</span>
                    <span className={`mt-1 font-bold ${selectedSize === size.name ? 'text-amber-100' : 'text-amber-700'}`}>
                      {size.priceOffset === 0 ? 'Base Price' : `+$${size.priceOffset}.00`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <div className="flex items-center justify-between bg-amber-50 rounded-xl p-1.5 border border-amber-900/15 w-36">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-amber-900 hover:bg-amber-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-amber-950 text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-amber-900 hover:bg-amber-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl font-semibold text-white transition-all shadow-md ${
                  product.inStock
                    ? addedSuccessfully
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-amber-700 hover:bg-amber-800 shadow-amber-700/20 hover:shadow-lg'
                    : 'bg-amber-200 text-amber-500 cursor-not-allowed shadow-none'
                }`}
              >
                {addedSuccessfully ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Hive Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    {product.inStock ? 'Add to Cart' : 'Sold Out'}
                  </>
                )}
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-900/10">
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-amber-50/60 border border-amber-950/5">
                <Truck className="w-5 h-5 text-amber-700 mb-1.5" />
                <span className="text-xs font-semibold text-amber-950">Free Delivery</span>
                <span className="text-[11px] text-amber-800/60">On orders over $50</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-amber-50/60 border border-amber-950/5">
                <RotateCcw className="w-5 h-5 text-amber-700 mb-1.5" />
                <span className="text-xs font-semibold text-amber-950">Easy Returns</span>
                <span className="text-[11px] text-amber-800/60">30-day guarantee</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-amber-50/60 border border-amber-950/5">
                <ShieldCheck className="w-5 h-5 text-amber-700 mb-1.5" />
                <span className="text-xs font-semibold text-amber-950">100% Pure Raw</span>
                <span className="text-[11px] text-amber-800/60">Unfiltered honey</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-white rounded-3xl border border-amber-900/10 p-8 shadow-xs mb-16">
          <div className="flex items-center gap-8 border-b border-amber-900/10 pb-4 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`font-semibold text-base pb-4 relative transition-colors ${
                activeTab === 'description' ? 'text-amber-700' : 'text-amber-950/60 hover:text-amber-950'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`font-semibold text-base pb-4 relative transition-colors ${
                activeTab === 'features' ? 'text-amber-700' : 'text-amber-950/60 hover:text-amber-950'
              }`}
            >
              Hive Highlights
              {activeTab === 'features' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`font-semibold text-base pb-4 relative transition-colors ${
                activeTab === 'shipping' ? 'text-amber-700' : 'text-amber-950/60 hover:text-amber-950'
              }`}
            >
              Shipping & Guarantee
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
              )}
            </button>
          </div>

          <div className="text-amber-950/80 text-sm leading-relaxed">
            {activeTab === 'description' && (
              <div>
                <p className="mb-4">{product.description}</p>
                <p>Every jar of Golden Hive honey is carefully packed by hand in our temperature-controlled facility to preserve all natural pollen grains, active enzymes, and delicate aromatic compounds straight from the honeycomb.</p>
              </div>
            )}
            {activeTab === 'features' && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 bg-amber-50/50 p-3.5 rounded-xl border border-amber-900/10">
                    <Check className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-amber-950 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'shipping' && (
              <div>
                <p className="mb-3">We pack every glass jar securely in eco-friendly protective honeycomb cushioning to ensure safe delivery.</p>
                <ul className="list-disc pl-5 space-y-1 text-amber-900/80">
                  <li>Standard Delivery (3-5 business days): Free on orders over $50</li>
                  <li>Express Courier (1-2 business days): $12.99</li>
                  <li>30-Day Taste & Quality Guarantee: Love your honey or get a full refund.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold tracking-tight text-amber-950">You Might Also Love</h2>
              <Link href="/#catalog" className="text-sm font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1">
                View All Honeys
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relProduct => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
