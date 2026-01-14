/**
 * Firebase Utilities
 * Helper functions untuk operasi Firebase
 * TIDAK MENGUBAH konfigurasi Firebase yang sudah ada
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { firebaseConfig } from '../config/firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase instances
export { app, auth, db };

// Export Firebase functions
export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove
};

/**
 * Get user role from Firestore
 */
export async function getUserRole(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().role || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting user role:', error);
    throw error;
  }
}

/**
 * Check if user is authenticated
 */
export function checkAuth() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

/**
 * Handle user logout
 */
export async function handleLogout() {
  try {
    await signOut(auth);
    window.location.href = '/dashboard.html';
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}
