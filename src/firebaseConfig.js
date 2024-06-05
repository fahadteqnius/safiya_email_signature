// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUNKVuCH15BpAFvAc500uvIwlXA5p3_hc",
  authDomain: "safiya-travels.firebaseapp.com",
  projectId: "safiya-travels",
  storageBucket: "safiya-travels.appspot.com",
  messagingSenderId: "531082481267",
  appId: "1:531082481267:web:12db2da02915d6afec6406",
  measurementId: "G-ECYG5W26Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app);

export {app, auth, storage};