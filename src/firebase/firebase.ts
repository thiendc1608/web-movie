// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { getDatabase} from "firebase/database";
import { FacebookAuthProvider } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDykR2yyevbIpzt9mrI534LnEIuYHzwEHo",
  authDomain: "web-movie-e0bf1.firebaseapp.com",
  projectId: "web-movie-e0bf1",
  storageBucket: "web-movie-e0bf1.appspot.com",
  messagingSenderId: "605220197833",
  appId: "1:605220197833:web:ec81361390c25d27938418",
  databaseURL: 'https://web-movie-e0bf1-default-rtdb.firebaseio.com'
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase()
const fbAuthProvider = new FacebookAuthProvider();
const ggAuthProvider = new GoogleAuthProvider();

export {app, auth, db}

export const FacebookAuth = () => {
  const fbAuth = signInWithPopup(auth, fbAuthProvider);
  return fbAuth
}

export const GoogleAuth = () => {
  const ggAuth = signInWithPopup(auth, ggAuthProvider);
  return ggAuth
}