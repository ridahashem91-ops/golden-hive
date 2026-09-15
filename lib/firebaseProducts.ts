import { database } from './firebase';
import { ref, get } from 'firebase/database';
import { PRODUCTS, Product } from '@/data/products';

export interface FirebaseProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  features: string[];
  isActive: boolean;
  isFeatured?: boolean;
}

export const INITIAL_FIREBASE_PRODUCTS: Record<string, FirebaseProduct> = PRODUCTS.reduce((acc, product) => {
  acc[product.id] = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    stockQuantity: product.inStock ? 50 : 0,
    image: product.image,
    images: product.images,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    features: product.features,
    isActive: product.inStock,
    isFeatured: product.isFeatured
  };
  return acc;
}, {} as Record<string, FirebaseProduct>);

export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = ref(database, 'products');
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      let items: any[] = [];
      if (Array.isArray(data)) {
        items = data.filter(Boolean);
      } else if (typeof data === 'object' && data !== null) {
        items = Object.values(data);
      }

      if (items.length > 0) {
        return items.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          originalPrice: p.originalPrice,
          category: p.category,
          rating: p.rating,
          reviewsCount: p.reviewsCount,
          image: p.image,
          images: p.images || [p.image],
          description: p.description,
          features: p.features || [],
          inStock: p.isActive !== undefined ? p.isActive : (p.stockQuantity > 0),
          isFeatured: p.isFeatured
        }));
      }
    }
  } catch (error) {
    console.error('Failed to fetch products from Firebase, falling back to local products:', error);
  }
  return PRODUCTS;
}
