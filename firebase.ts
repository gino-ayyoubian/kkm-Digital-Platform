import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export let db: any = null;
try {
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
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

// Initialize Firebase Performance Monitoring
export let perf = null;
try {
  if (typeof window !== 'undefined') {
    perf = getPerformance(app);
  }
} catch(e) {
  console.warn('Firebase Performance initialization failed (possibly restricted storage):', e);
}
