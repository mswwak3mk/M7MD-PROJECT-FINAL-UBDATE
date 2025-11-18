// Fix: Use Firebase v8 imports
// Fix: Use Firebase v9 compat imports to support v8 namespaced API.
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/analytics';

// Your web app's Firebase configuration from user prompt
const firebaseConfig = {
    apiKey: "AIzaSyDikimXQ2a6AWaICAH8fDyIP0EZz-Izgb8",
    authDomain: "mohammed-project-98613.firebaseapp.com",
    projectId: "mohammed-project-98613",
    storageBucket: "mohammed-project-98613.firebasestorage.app",
    messagingSenderId: "852489105730",
    appId: "1:852489105730:web:c544d0beca2fbcc19e58db",
    measurementId: "G-KR1P7QZF6Q"
};

// Fix: Use Firebase v8 initialization
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}
export const db = firebase.firestore();
export const storage = firebase.storage();

// A single document will hold all portfolio data
// Fix: Use v8 syntax to create document reference
export const portfolioDocRef = db.collection('portfolio').doc('data');