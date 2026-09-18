import { initializeApp } from 'firebase/app';
import { initializeAuth, inMemoryPersistence, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export let db: any = null;
try {
  db = initializeFirestore(app, { localCache: memoryLocalCache() }, firebaseConfig.firestoreDatabaseId);
} catch (e) {
  console.warn('Firestore initialization failed:', e);
}
export let auth: any = null;
try {
  auth = initializeAuth(app, { persistence: inMemoryPersistence });
} catch (e) {
  console.warn('Firebase Auth initialization failed:', e);
}
export const googleProvider = new GoogleAuthProvider();

export let perf = null;
