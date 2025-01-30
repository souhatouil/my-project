
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import 'firebase/firestore';
// import firebase from 'firebase/app';

// Firebase SDK imports (modular)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw3UQ-vdK8vPmxciKvEM_5NAnXs1SKAF0",
  authDomain: "monprojetvuejs-a0ead.firebaseapp.com",
  projectId: "monprojetvuejs-a0ead",
  storageBucket: "monprojetvuejs-a0ead.appspot.com",
  messagingSenderId: "648634707690",
  appId: "1:648634707690:web:922fd22f5076e5e226f193",
  measurementId: "G-J2G179CLNG",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);
const auth = getAuth(app); 

export { db,auth,collection, getDocs, addDoc, deleteDoc, doc };

// // Initialize Firebase
// let firebaseApp;

// if (!getApps().length) {
//   firebaseApp = initializeApp(firebaseConfig);
// } else {
//   firebaseApp = getApps()[0];
// }

// // Initialize Firebase Authentication and Firestore
// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);

// // Export instances
// export { auth, db };


