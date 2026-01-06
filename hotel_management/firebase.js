// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiukfyVWCdT1dUDJ42Z3heJi85a-is7T8",
  authDomain: "hotelmanagement-d1d28.firebaseapp.com",
  projectId: "hotelmanagement-d1d28",
  storageBucket: "hotelmanagement-d1d28.firebasestorage.app",
  messagingSenderId: "899294604628",
  appId: "1:899294604628:web:cd34e8ab57ea69c68d6cc1",
  measurementId: "G-HZFXZK760R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services and export them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
