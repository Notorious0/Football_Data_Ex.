import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc9C6NiGBPPWLAwGGNVP16hM2CBTwSgr8",
  authDomain: "testapp-ca6c3.firebaseapp.com",
  projectId: "testapp-ca6c3",
  storageBucket: "testapp-ca6c3.appspot.com",
  messagingSenderId: "72152341657",
  appId: "1:72152341657:web:60d7d7d3878b89ca1fec08",
  measurementId: "G-4E58YV6QJE"
};

// Firebase uygulamasının zaten başlatılıp başlatılmadığını kontrol edin
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = !getApps().length ? initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}) : getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

