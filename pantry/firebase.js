// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoUMJfWELVqjsw9iVMfiQAxYYpcm70i7c",
  authDomain: "hspantryapp-4c87a.firebaseapp.com",
  projectId: "hspantryapp-4c87a",
  storageBucket: "hspantryapp-4c87a.appspot.com",
  messagingSenderId: "710818726315",
  appId: "1:710818726315:web:ed9fa7a183776a79d112ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}