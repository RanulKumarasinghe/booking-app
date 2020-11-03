import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjz8Jc2xn3BVpR1jW0fZYJnXxPOUgazCc",
  authDomain: "eatin-d731f.firebaseapp.com",
  databaseURL: "https://eatin-d731f.firebaseio.com",
  projectId: "eatin-d731f",
  storageBucket: "eatin-d731f.appspot.com",
  messagingSenderId: "240925319711",
  appId: "1:240925319711:web:842884c0ef4e1e9ec6ab2a",
  measurementId: "G-XFJYZHEKDB"
};

let initFirebase = firebase.initializeApp(firebaseConfig);

export default initFirebase;
