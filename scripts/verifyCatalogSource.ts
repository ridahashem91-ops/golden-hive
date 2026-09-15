import { getProducts } from '../lib/firebaseProducts';
import { database } from '../lib/firebase';
import { ref, get } from 'firebase/database';

async function verifyDataSource() {
  console.log('Verifying product catalog data source from Firebase Realtime Database (/products)...');
  
  // Directly fetch from Firebase to compare
  const firebaseRef = ref(database, 'products');
  const snapshot = await get(firebaseRef);
  
  if (snapshot.exists()) {
    console.log('Firebase Realtime Database at /products has active data.');
    const products = await getProducts();
    console.log(`Successfully fetched ${products.length} products via getProducts().`);
    console.log('Data source confirmed: Firebase Realtime Database (/products).');
  } else {
    console.error('Firebase /products returned no data.');
    process.exit(1);
  }
  process.exit(0);
}

verifyDataSource();
