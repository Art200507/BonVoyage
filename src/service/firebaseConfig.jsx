import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
const config = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
 projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
 appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const firebaseConfigured = Object.values(config).every(Boolean);
export const app = firebaseConfigured ? initializeApp(config) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
export async function loginWithGoogle() {
 if (!auth) throw new Error('Sign-in is not configured yet. Please try again later.');
 return (await signInWithPopup(auth, new GoogleAuthProvider())).user;
}
export async function logout() { if (auth) await signOut(auth); localStorage.removeItem('user'); }
