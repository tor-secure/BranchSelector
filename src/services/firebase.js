import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  setPersistence,
  signInWithEmailLink,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
  limit,
  updateDoc,
  startAfter
} from "firebase/firestore";

//firebase configuration for this project
const firebaseConfig = {
  apiKey: "AIzaSyCpgxv9pnY0yr6ICyfzi-fvyLmWoAYTlQY",
  authDomain: "auth.branchselector.com",
  projectId: "branchselector-493c2",
  storageBucket: "branchselector-493c2.appspot.com",
  messagingSenderId: "615584898606",
  appId: "1:615584898606:web:810220f171b6d01ec689bf",
  measurementId: "G-MFPC984CX6",
};

//initializing the firebase and analytics for the application
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//exporting all the services
export {
  //firebase app
  app,

  //firebase authentication
  GoogleAuthProvider,
  getAuth,
  setPersistence,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailLink,

  //firebase analytics
  analytics,

  //firestore
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
  updateDoc,
  limit,
  startAfter
};
