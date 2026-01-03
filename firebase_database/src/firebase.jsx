import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDefBiMWbhq1nTgjbBZ0iV-I2_i0VF3cOY",
  authDomain: "fir-1-c116b.firebaseapp.com",
  projectId: "fir-1-c116b",
  storageBucket: "fir-1-c116b.firebasestorage.app",
  messagingSenderId: "894412581264",
  appId: "1:894412581264:web:cfa9c49dc661dedaa4eb15",
  measurementId: "G-2SQNVL8TG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
