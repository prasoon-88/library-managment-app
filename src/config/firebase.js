import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD9QNUf3bx2kYWoWXXWZB7WpRPgH1xvhQA",
    authDomain: "library-management-app-c3c56.firebaseapp.com",
    projectId: "library-management-app-c3c56",
    storageBucket: "library-management-app-c3c56.appspot.com",
    messagingSenderId: "1021915581734",
    appId: "1:1021915581734:web:4d36e178a20c5300d545e7",
    measurementId: "G-N3WSKCZTY7"

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);