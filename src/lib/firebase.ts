import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, signInAnonymously, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBpwlIlGCPFgEHklmf_ktondL3iZzvXiKM",
  authDomain: "farm-booking-platform.firebaseapp.com",
  projectId: "farm-booking-platform",
  storageBucket: "farm-booking-platform.firebasestorage.app",
  messagingSenderId: "429889441151",
  appId: "1:429889441151:web:040ae0d0bd315a4ad55e4a"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Use emulators in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

// Helper function for anonymous auth
export const authenticateAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error('Anonymous authentication failed:', error);
    throw error;
  }
};