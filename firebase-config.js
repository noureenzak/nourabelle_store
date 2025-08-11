// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAvOpz6uvlLwLW362vv-66GFegn_EHPp0",
  authDomain: "nourabelle-store.firebaseapp.com",
  projectId: "nourabelle-store",
  storageBucket: "nourabelle-store.firebasestorage.app",
  messagingSenderId: "43806378011",
  appId: "1:43806378011:web:ffe658358335c3041890be",
  measurementId: "G-121S4M5MK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export for use in your other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
