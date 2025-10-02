import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAN7NxdI-zJs4folMZxhurfXoBHw1Qiyo0",
  authDomain: "rent-car-25ee2.firebaseapp.com",
  databaseURL: "https://rent-car-25ee2-default-rtdb.firebaseio.com",
  projectId: "rent-car-25ee2",
  storageBucket: "rent-car-25ee2.appspot.com",
  messagingSenderId: "630044417741",
  appId: "1:630044417741:web:9f4fa1ffbcd991c7a49384",
  measurementId: "G-MCF3LSXH5B",
};

export const app = initializeApp(firebaseConfig)
export const db = getDatabase();