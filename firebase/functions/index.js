const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.placeOrder = functions.https.onCall(async (data, context) => {
  // Grab the text parameter.
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('orders').add({original: original});
  // // Send back a message that we've successfully written the message
  console.log(data)

  return {data: data};
});


// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.returnObject = functions.https.onCall(async (data, context) => {
  // Grab the text parameter.
  // Push the new message into Firestore using the Firebase Admin SDK.
  // const writeResult = await admin.firestore().collection('messages').add({original: original});
  // // Send back a message that we've successfully written the message
  console.log(data)

  return {data: data};
});
