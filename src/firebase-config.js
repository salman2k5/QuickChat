// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAfzzcF7yjlXtrXzJP6OGs5oYlx-SY4HK0",
  authDomain: "chatapp-8a474.firebaseapp.com",
  projectId: "chatapp-8a474",
  storageBucket: "chatapp-8a474.appspot.com",
  messagingSenderId: "55130289859",
  appId: "1:55130289859:web:840dad1382469477c41476",
  measurementId: "G-6EFJ2TX2BH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);