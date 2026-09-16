import { database } from './firebase';
import { ref, get, update } from 'firebase/database';
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
  saleId: string;
  orderId: string;
  createdAt: number;
  customerName: string;
  customerPhone: string;
  status: string;
  paymentStatus: string;
  purchasedItems: SaleItemSnapshot[];
  subtotal: number;
  discount: number;
  deliveryCost: number;
  grandTotal: number;
}

export async function recordSaleAndReduceStock(
  cart: CartItem[],
  subtotal: number,
  deliveryCost: number,
  discount: number = 0,
  grandTotal: number
): Promise<string> {
  if (!cart || cart.length === 0) {
    throw new Error('Cart is empty. Cannot record sale.');
  }

  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const saleId = `SALE-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const createdAt = Date.now();

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
    saleId,
    orderId,
    createdAt,
    customerName: 'Valued Customer',
    customerPhone: 'N/A',
    status: 'Completed',
    paymentStatus: 'Paid',
    purchasedItems,
    subtotal,
    discount,
    deliveryCost,
    grandTotal
  };

  const updates: Record<string, any> = {};

  // 1. Prepare sale record under /sales/${saleId} (and also support lookup by orderId if needed, or save under saleId)
  updates[`sales/${saleId}`] = JSON.parse(JSON.stringify(saleRecord));
  updates[`sales/${orderId}`] = JSON.parse(JSON.stringify(saleRecord)); // Backwards compatibility / dual reference

  // 2. Fetch current stock for all products and prepare stock reduction updates
  for (const item of cart) {
    const productRef = ref(database, `products/${item.product.id}`);
    const snapshot = await get(productRef);
    
    let currentStock = 50;
    if (snapshot.exists()) {
      const productData = snapshot.val();
      if (typeof productData.stockQuantity === 'number') {
        currentStock = productData.stockQuantity;
      }
    }

    const newStock = Math.max(0, currentStock - item.quantity);
    
    updates[`products/${item.product.id}/stockQuantity`] = newStock;
    updates[`products/${item.product.id}/isActive`] = newStock > 0;
  }

  // 3. Atomically execute all updates (sale creation + stock updates)
  try {
    const rootRef = ref(database);
    await update(rootRef, updates);
    console.log(`Successfully recorded sale ${saleId} (Order: ${orderId}) and updated product stock.`);
    return orderId;
  } catch (error) {
    console.error('Failed to record sale or update stock in Firebase:', error);
    throw error;
  }
}
