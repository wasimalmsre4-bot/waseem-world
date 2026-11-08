import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbYkDUEbU2lla82cOVAJEt99kxEZIKyQs",
  authDomain: "waseem-world.firebaseapp.com",
  projectId: "waseem-world",
  storageBucket: "waseem-world.firebasestorage.app",
  messagingSenderId: "937441396143",
  appId: "1:937441396143:web:d15918df3b6a39567e9b5a",
  measurementId: "G-N3907L3QV4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();