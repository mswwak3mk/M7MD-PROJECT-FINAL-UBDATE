
// We rely on the global scripts loaded in index.html
// This bypasses module loading issues with the compat libraries
// @ts-ignore
const firebase = window.firebase;

const firebaseConfig = {
    apiKey: "AIzaSyDikimXQ2a6AWaICAH8fDyIP0EZz-Izgb8",
    authDomain: "mohammed-project-98613.firebaseapp.com",
    projectId: "mohammed-project-98613",
    // Correct bucket address for default Firebase projects
    storageBucket: "mohammed-project-98613.appspot.com", 
    messagingSenderId: "852489105730",
    appId: "1:852489105730:web:c544d0beca2fbcc19e58db",
    measurementId: "G-KR1P7QZF6Q"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

export const db = firebase.firestore();
// Storage is no longer used as per request to store Base64 in Firestore
// export const storage = firebase.storage();

// A single document will hold all portfolio data
export const portfolioDocRef = db.collection('portfolio').doc('data');

// Export the firebase object so App.tsx can use FieldValue
export default firebase;
