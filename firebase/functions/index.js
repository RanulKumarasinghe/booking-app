const functions = require('firebase-functions');
const admin = require('firebase-admin');

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

admin.initializeApp(firebaseConfig);
const db = admin.firestore();

// Initialize products array
const products = [];

// Max number of products
const LIMIT = 100;

// Push a new product to the array
for (let i = 0; i < LIMIT; i++) {
  products.push({
    name: 'TTTTAS',
    price: 'BBBBC',
  });
}

exports.listProducts = functions.https.onCall((data, context) => {
  return products;
});

//HTTP REQUEST
exports.testRequest = functions.https.onRequest((request, response) => {
  db.collection("times").doc("new-city-id").set(data);
  response.send(100)
});

//HTTP CALLABLE FUNCTIOn
exports.testCall = functions.https.onCall((data, context) => {
  return 'Hello world';
});