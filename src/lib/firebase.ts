import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD05-Cq1xruEJGp3pZItVCVDbeZqrYSN1k",
  authDomain: "dietaryguidewebstore.firebaseapp.com",
  projectId: "dietaryguidewebstore",
  storageBucket: "dietaryguidewebstore.firebasestorage.app",
  messagingSenderId: "727014550779",
  appId: "1:727014550779:web:61bd7af5e667fe5eac545e",
  measurementId: "G-JPY0FW0HML",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
