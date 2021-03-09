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
  
  const fetchItems = (restaurantId, item) => {
    return admin.firestore().doc(`restaurants/${restaurantId}/menu/${item.itemId}`).get().then(doc => {
      return {
        item: doc.data(),
        quantity: item.quantity,
      }
    }).catch(err =>{
      console.log("err fetching files")
    })
  }
  
  const getItems = async (cart, restaurantId) => {
    return Promise.all(cart.map(cartItem => fetchItems(restaurantId, cartItem)))
  }
  
  const userId = 1
  getItems(data.cart, order.orderRestaurantId).then(data => {
    return {
      restaurantId: order.orderRestaurantId,
      userId: userId,
      createdAt: new Date(),
      cart: data
    }
  }).catch(err =>  {
    return {
      ok: false
    }
  })
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
