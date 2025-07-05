import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Use environment variables or fallback to the existing config
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBen1J_DpKSaugYdEHUrNDmRQds24AR9-M",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dietaryguideblog.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dietaryguideblog",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dietaryguideblog.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "417188148233",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:417188148233:web:b225ad7071ad2cbe8df4d8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { app, auth, googleProvider };
