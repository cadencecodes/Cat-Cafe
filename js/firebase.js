// Firebase initialization
// Replace the placeholder values below with your actual Firebase project config
// from: Firebase Console > Project Settings > Your Apps > SDK setup and configuration

const firebaseConfig = {
  apiKey: "AIzaSyALixSiJPc1FI0LnIgMIAPQp8aCDPAz-d0",
  authDomain: "purrfect-pear.firebaseapp.com",
  databaseURL: "https://purrfect-pear-default-rtdb.firebaseio.com",
  projectId: "purrfect-pear",
  storageBucket: "purrfect-pear.firebasestorage.app",
  messagingSenderId: "10340353743",
  appId: "1:10340353743:web:8a876213da897b3e36d9ba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Global instances available to all scripts
const auth = firebase.auth();
const db   = firebase.firestore();
