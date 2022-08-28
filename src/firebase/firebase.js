// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8Ku0SNKnzv86S1ZkP4BawzRZix0sw99c",
  authDomain: "eng-project-c8534.firebaseapp.com",
  projectId: "eng-project-c8534",
  storageBucket: "eng-project-c8534.appspot.com",
  messagingSenderId: "737066180312",
  appId: "1:737066180312:web:9f15507f19cc3efff741ad",
  measurementId: "G-1RG88N6LGL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
export { auth, db };
