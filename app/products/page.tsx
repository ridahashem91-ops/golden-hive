import React from 'react';
import { getProducts } from '@/lib/firebaseProducts';
import ProductsContent from '@/components/ProductsContent';

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsContent products={products} />;
}
