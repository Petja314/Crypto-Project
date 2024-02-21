// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB44JMBCGkSS96DkITgYYKeDKJN8L6psM0",
    authDomain: "crypto-project-99be2.firebaseapp.com",
    projectId: "crypto-project-99be2",
    storageBucket: "crypto-project-99be2.appspot.com",
    messagingSenderId: "353192074485",
    appId: "1:353192074485:web:dcc4ee95bd298c05cdf9bc",
    measurementId: "G-VSKC2JY72D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)