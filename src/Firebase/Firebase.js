import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB1jayC8UE_HS7ac6rwATzcKKJ787KEuo",
  authDomain: "twitter-48a2e.firebaseapp.com",
  projectId: "twitter-48a2e",
  storageBucket: "twitter-48a2e.appspot.com",
  messagingSenderId: "944950951526",
  appId: "1:944950951526:web:b884dbdbe0883bc09377a7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };

export default db;
