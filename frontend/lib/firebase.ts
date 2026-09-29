"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In Popup Handler
export async function signInWithGooglePopup() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      idToken,
    };
  } catch (error: any) {
    console.error("Google Popup Sign-in Error:", error);
    let friendlyMessage = error.message || "Failed to sign in with Google";
    if (error.code === "auth/configuration-not-found") {
      friendlyMessage = "Google Sign-In is not enabled yet in your Firebase Console. Go to Firebase Console -> Authentication -> Sign-in method -> Enable 'Google'.";
    } else if (error.code === "auth/popup-closed-by-user") {
      friendlyMessage = "Sign-in popup was closed before completing authentication.";
    } else if (error.code === "auth/cancelled-popup-request") {
      friendlyMessage = "Only one sign-in popup can be opened at a time.";
    }
    return {
      success: false,
      error: friendlyMessage,
      code: error.code,
    };
  }
}

export async function signOutFirebase() {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
