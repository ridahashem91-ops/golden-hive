import React from 'react';
import { getProducts } from '@/lib/firebaseProducts';
import HomeSidebar from '@/components/HomeSidebar';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col lg:flex-row text-amber-950">
      {/* Left Sidebar Navigation */}
      <HomeSidebar />

      {/* Main Content Area */}
      <HomeContent products={products} />
    </div>
  );
}
