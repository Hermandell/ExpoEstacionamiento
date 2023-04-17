import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnmg7wUvx3ozhS_cFFoo66JzOoNeDXr-k",
  authDomain: "estacionamientohd.firebaseapp.com",
  projectId: "estacionamientohd",
  storageBucket: "estacionamientohd.appspot.com",
  messagingSenderId: "820879444973",
  appId: "1:820879444973:web:7809de9ae86745e27cf5e4",
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
