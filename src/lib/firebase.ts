// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ3yXXQiaAnKHD6NvH9c1CB_MKz_n_92w",
  authDomain: "afhoffice-c50a4.firebaseapp.com",
  projectId: "afhoffice-c50a4",
  storageBucket: "afhoffice-c50a4.firebasestorage.app",
  messagingSenderId: "195510978511",
  appId: "1:195510978511:web:d1a5bc5960012cb82874ba",
  measurementId: "G-Z38BVYQ6G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics only on client side
export const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  try {
    // Only connect to emulators if not already connected
    if (!auth.emulatorConfig) {
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
  } catch (error) {
    // Emulators might already be connected
    console.log('Firebase emulators already connected or not available');
  }
}

export default app; 