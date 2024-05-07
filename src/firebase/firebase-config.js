// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdvL_dQHXtuhP9Bq8vpZrz9MQZMjbkQoM",
  authDomain: "anna-s-kitchen-47f96.firebaseapp.com",
  projectId: "anna-s-kitchen-47f96",
  storageBucket: "anna-s-kitchen-47f96.appspot.com",
  messagingSenderId: "730833401840",
  appId: "1:730833401840:web:22200c2539f0930aa44f35",
  measurementId: "G-K650XWKWKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
