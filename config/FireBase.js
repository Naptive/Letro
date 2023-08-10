// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoq9utnlZd-qfnRBAAbR88I-GOIwZQyFc",
  authDomain: "letro-469f0.firebaseapp.com",
  projectId: "letro-469f0",
  storageBucket: "letro-469f0.appspot.com",
  messagingSenderId: "693531912824",
  appId: "1:693531912824:web:58a9097b1dcce8967f1b8d",
  measurementId: "G-T19RPLL94R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);