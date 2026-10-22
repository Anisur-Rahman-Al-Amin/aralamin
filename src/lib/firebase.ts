import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDpRYKq45dsZnsFDG5O8IShHfiRXalThdQ',
  authDomain: 'anisur-rahman-portfolio.firebaseapp.com',
  projectId: 'anisur-rahman-portfolio',
  storageBucket: 'anisur-rahman-portfolio.firebasestorage.app',
  messagingSenderId: '1034193589940',
  appId: '1:1034193589940:web:f2e02580694c49c1e869e1',
  measurementId: 'G-6G8591J6FX',
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export async function startAnalytics() {
  if (typeof window === 'undefined') return
  const analytics = await import('firebase/analytics')
  if (await analytics.isSupported()) analytics.getAnalytics(firebaseApp)
}
