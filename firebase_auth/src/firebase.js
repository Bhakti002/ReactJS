import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZWbe9QO-qNx3rLShNtwRS3nDpY6Sx--8",
  authDomain: "fir-auth-b2409.firebaseapp.com",
  projectId: "fir-auth-b2409",
  storageBucket: "fir-auth-b2409.firebasestorage.app",
  messagingSenderId: "787037526899",
  appId: "1:787037526899:web:494e9a93508b9631dcc306",
  measurementId: "G-9VY9T5PFHQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
