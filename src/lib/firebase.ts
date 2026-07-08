import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Buyer/storefront project - used for customer accounts, cart, orders
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD05-Cq1xruEJGp3pZItVCVDbeZqrYSN1k",
  authDomain: "dietaryguidewebstore.firebaseapp.com",
  projectId: "dietaryguidewebstore",
  storageBucket: "dietaryguidewebstore.firebasestorage.app",
  messagingSenderId: "727014550779",
  appId: "1:727014550779:web:61bd7af5e667fe5eac545e",
  measurementId: "G-JPY0FW0HML",
};

// Blog admin project - used only for the /admin_blog_maker_editor dashboard,
// kept separate so buyer accounts can never sign into the blog admin panel
const blogFirebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBen1J_DpKSaugYdEHUrNDmRQds24AR9-M",
  authDomain: "dietaryguideblog.firebaseapp.com",
  projectId: "dietaryguideblog",
  storageBucket: "dietaryguideblog.firebasestorage.app",
  messagingSenderId: "417188148233",
  appId: "1:417188148233:web:b225ad7071ad2cbe8df4d8",
  measurementId: "G-WZTCRDGX50",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const blogApp = getApps().some((a) => a.name === "blogApp")
  ? getApp("blogApp")
  : initializeApp(blogFirebaseConfig, "blogApp");
const blogAuth = getAuth(blogApp);

export { app, auth, db, blogApp, blogAuth };
