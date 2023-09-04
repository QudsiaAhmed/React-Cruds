// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBI6tUXh63pk3mRPBXol8jSUJAMBhYXTQU",
  authDomain: "react-crud-294c2.firebaseapp.com",
  projectId: "react-crud-294c2",
  storageBucket: "react-crud-294c2.appspot.com",
  messagingSenderId: "467888939439",
  appId: "1:467888939439:web:575f5e9f62ee83578f8f5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app); 