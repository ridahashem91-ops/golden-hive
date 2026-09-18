import React from 'react';
import { getProducts } from '@/lib/firebaseProducts';
import ProductCatalog from '@/components/ProductCatalog';
import HomeSidebar from '@/components/HomeSidebar';
import { Sparkles } from 'lucide-react';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col lg:flex-row text-amber-950">
      {/* Left Sidebar Navigation */}
      <HomeSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-amber-50/70 via-[#FFFDF9] to-[#FFFDF9] py-8 px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Artisanal Honey Collection
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight text-amber-950 mb-2">
              Explore All <span className="italic font-normal text-amber-600">Pure Honey</span> Products
            </h1>
            <p className="text-xs sm:text-sm text-amber-900/80 max-w-2xl mx-auto leading-relaxed">
              Browse our complete selection of raw, unheated, and unfiltered honeys, artisanal combs, and gift sets harvested sustainably from pristine apiaries.
            </p>
          </div>
        </section>

        {/* Product Catalog Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50/30 flex-1">
          <div className="max-w-7xl mx-auto">
            <ProductCatalog products={products} />
          </div>
        </section>
      </div>
    </div>
  );
}
