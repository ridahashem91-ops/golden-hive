import { database } from '../lib/firebase';
import { ref, set, get } from 'firebase/database';
import { INITIAL_FIREBASE_PRODUCTS } from '../lib/firebaseProducts';

async function seedAndVerifyProducts() {
  const dbPath = 'products';
  const productsRef = ref(database, dbPath);

  // Sanitize data to remove undefined values (Firebase does not accept undefined)
  const sanitizedProducts = JSON.parse(JSON.stringify(INITIAL_FIREBASE_PRODUCTS));

  console.log(`Uploading product data to Firebase Realtime Database at path: /${dbPath}...`);
  try {
    await set(productsRef, sanitizedProducts);
    console.log('Successfully uploaded products to Firebase.');

    console.log(`Verifying products exist at path: /${dbPath}...`);
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const productKeys = Object.keys(data);
      console.log(`Verification successful! Found ${productKeys.length} products at exact path: /${dbPath}`);
      console.log('Product IDs:', productKeys);
    } else {
      console.error('Verification failed: No data found at path /products.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error seeding/verifying products:', error);
    process.exit(1);
  }
  process.exit(0);
}

seedAndVerifyProducts();
