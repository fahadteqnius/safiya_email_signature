// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh8JB1-nEVjLnscIBUgp0ZJwC-OQT8j74",
  authDomain: "safiya-email-sign-generator.firebaseapp.com",
  projectId: "safiya-email-sign-generator",
  storageBucket: "safiya-email-sign-generator.appspot.com",
  messagingSenderId: "542138381502",
  appId: "1:542138381502:web:a35c41c1a613f4bbe5daef",
  measurementId: "G-B057GP6TYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export {app, auth};