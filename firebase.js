// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAquYmjU6VNk6cIf6gTWyG5jArEtJN2hGY",
  authDomain: "kin-9d03d.firebaseapp.com",
  projectId: "kin-9d03d",
  storageBucket: "kin-9d03d.firebasestorage.app",
  messagingSenderId: "462828528225",
  appId: "1:462828528225:web:df15bda0102370f1628020",
  measurementId: "G-R0MT42C7NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);