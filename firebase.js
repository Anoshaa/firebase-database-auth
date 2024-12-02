import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,


} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-rNLqyT0YgzUG0QT8NexSRlxShw8TcLk",
  authDomain: "fir-authentication-29bee.firebaseapp.com",
  projectId: "fir-authentication-29bee",
  storageBucket: "fir-authentication-29bee.appspot.com",
  messagingSenderId: "778869735848",
  appId: "1:778869735848:web:e9d8dbd1ffa47956f31d9d",
  measurementId: "G-MQG7P2QDSW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();


// Export modules
export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithPopup,
  onAuthStateChanged,
  db,
  doc,
  setDoc,
  getDoc,
  updateProfile
};
