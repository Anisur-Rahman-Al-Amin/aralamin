import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDpRYKq45dsZnsFDG5O8IShHfiRXalThdQ',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'anisur-rahman-portfolio.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'anisur-rahman-portfolio',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'anisur-rahman-portfolio.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1034193589940',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1034193589940:web:f2e02580694c49c1e869e1',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-6G8591J6FX',
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export async function startAnalytics() {
  if (typeof window === 'undefined') return
  const analytics = await import('firebase/analytics')
  if (await analytics.isSupported()) analytics.getAnalytics(firebaseApp)
}
