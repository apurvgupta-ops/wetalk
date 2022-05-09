import firebase, { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDUXTtDpdf808JsX2MbKcZ_G9WKTMJovho",
  authDomain: "wetalk-2c171.firebaseapp.com",
  projectId: "wetalk-2c171",
  storageBucket: "wetalk-2c171.appspot.com",
  messagingSenderId: "587669479921",
  appId: "1:587669479921:web:0ca45d0f3b0aa9cdd0a450",
};

// Firebase 9
export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()