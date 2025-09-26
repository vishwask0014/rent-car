import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN7NxdI-zJs4folMZxhurfXoBHw1Qiyo0",
  authDomain: "rent-car-25ee2.firebaseapp.com",
  databaseURL: "https://rent-car-25ee2-default-rtdb.firebaseio.com",
  projectId: "rent-car-25ee2",
  storageBucket: "rent-car-25ee2.firebasestorage.app",
  messagingSenderId: "630044417741",
  appId: "1:630044417741:web:9f4fa1ffbcd991c7a49384",
  measurementId: "G-MCF3LSXH5B",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApp().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

// export DB handles
export const realtimeDB = getDatabase(app);
export const firebaseDB = getFirestore(app);
