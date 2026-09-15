import { database } from './firebase';
import { ref, get, set, update } from 'firebase/database';
import { CartItem } from '@/data/products';

export interface SaleItemSnapshot {
  productId: string;
  productName: string;
  category: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  image?: string;
}

export interface SaleRecord {
  orderId: string;
  timestamp: number;
  date: string;
  customerName: string;
  customerPhone: string;
  orderStatus: string;
  purchasedItems: SaleItemSnapshot[];
  subtotal: number;
  discount: number;
  deliveryCost: number;
  tax: number;
  grandTotal: number;
}

export async function recordSaleAndReduceStock(
  cart: CartItem[],
  subtotal: number,
  shippingFee: number,
  tax: number,
  grandTotal: number
): Promise<string> {
  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  const purchasedItems: SaleItemSnapshot[] = cart.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    category: item.product.category,
    unitPrice: item.product.price,
    quantity: item.quantity,
    lineTotal: item.product.price * item.quantity,
    image: item.product.image || ''
  }));

  const saleRecord: SaleRecord = {
    orderId,
    timestamp: Date.now(),
    date: new Date().toISOString(),
    customerName: 'Valued Customer',
    customerPhone: 'N/A',
    orderStatus: 'Completed',
    purchasedItems,
    subtotal,
    discount: 0,
    deliveryCost: shippingFee,
    tax,
    grandTotal
  };

  try {
    // 1. Save permanent sales record under /sales
    const saleRef = ref(database, `sales/${orderId}`);
    const sanitizedSale = JSON.parse(JSON.stringify(saleRecord));
    await set(saleRef, sanitizedSale);

    // 2. Reduce corresponding product stock quantity in Firebase /products
    for (const item of cart) {
      const productRef = ref(database, `products/${item.product.id}`);
      const snapshot = await get(productRef);
      if (snapshot.exists()) {
        const productData = snapshot.val();
        const currentStock = typeof productData.stockQuantity === 'number' ? productData.stockQuantity : 50;
        const newStock = Math.max(0, currentStock - item.quantity);
        
        await update(productRef, {
          stockQuantity: newStock,
          isActive: newStock > 0
        });
      }
    }

    console.log(`Successfully recorded sale ${orderId} and updated product stock.`);
    return orderId;
  } catch (error) {
    console.error('Failed to record sale or update stock in Firebase:', error);
    throw error;
  }
}
