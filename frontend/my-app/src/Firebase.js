import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjSZ22Si1bDnJ2_l5e6UEOgsJ7xeuofLw",
  authDomain: "simulife-ee392.firebaseapp.com",
  projectId: "simulife-ee392",
  storageBucket: "simulife-ee392.firebasestorage.app",
  messagingSenderId: "637330621637",
  appId: "1:637330621637:web:8435dc410415acbfe8dcac"
};

// ✅ Prevent re-initialization (Next.js safe)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 🔐 Auth
export const auth = getAuth(app);

// 🔑 Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
