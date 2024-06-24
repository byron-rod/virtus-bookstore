// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD9_VXbXYZ9Ye5l0u2_xvrhWM01gbR42s",
  authDomain: "virtus-bookstore.firebaseapp.com",
  projectId: "virtus-bookstore",
  storageBucket: "virtus-bookstore.appspot.com",
  messagingSenderId: "648598462721",
  appId: "1:648598462721:web:ccd030c75d51ab4f837b00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
