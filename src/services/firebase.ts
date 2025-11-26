import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDAz0JFeY5ksQfFjR8NKnIYjRnidgjrBv8",
    authDomain: "atomix-academy.firebaseapp.com",
    projectId: "atomix-academy",
    storageBucket: "atomix-academy.firebasestorage.app",
    messagingSenderId: "691159032490",
    appId: "1:691159032490:web:0be64c32a8890c556326d3",
    measurementId: "G-5GR6K7M475"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Providerni sozlash
export const googleProvider = new GoogleAuthProvider();
// Foydalanuvchidan har safar akkaunt tanlashni so'rash (xatoliklarni kamaytiradi)
googleProvider.setCustomParameters({
    prompt: 'select_account'
});