import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAfA7ZuAgpiDgBE8dmofU0I0kgpdb8039Y",
  authDomain: "hotel-65ad6.firebaseapp.com",
  projectId: "hotel-65ad6",
  storageBucket: "hotel-65ad6.firebasestorage.app",
  messagingSenderId: "998579482011",
  appId: "1:998579482011:web:2124e1869ecae7f86cc53e",
  measurementId: "G-ZRBBSL2S2Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);