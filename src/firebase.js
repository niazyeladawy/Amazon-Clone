import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";




const firebaseConfig = {
    apiKey: "AIzaSyBdzyXXGa1VEsHzCZfX4YmTeWYV8qJySQ0",
    authDomain: "challenge-84c03.firebaseapp.com",
    projectId: "challenge-84c03",
    storageBucket: "challenge-84c03.appspot.com",
    messagingSenderId: "1069171642381",
    appId: "1:1069171642381:web:f7a6da5118a82edbdf0544",
    measurementId: "G-6EMVCNV42R"
  };

const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();

export {db , auth};