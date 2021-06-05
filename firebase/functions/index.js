const functions = require("firebase-functions");
const axios = require('axios');

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

exports.getData = functions.https.pubsub.schedule('00 00 * * *').timeZone('Europe/London').onRun((data) => {

  // pubsub.schedule('00 00 * * *').timeZone('Europe/London').onRun

    return admin.firestore().collection(`restaurants`).get().then((querySnapshot) => {
      const menuArray = querySnapshot.docs.map((doc) => {
        params = {
          place_id: doc.data().google_id,
          fields: "rating,formatted_phone_number,opening_hours,vicinity",
          key: 'AIzaSyAP5rJS__ryEAgiFKsZMtMFDfsltB_1Vyc',
        }
        return axios.get('https://maps.googleapis.com/maps/api/place/details/json', { params }).then(response => {
          const newRestaurantValues = {
            googleData: response.data.result
          }
        return admin.firestore().doc(`restaurants/${doc.id}`).update(newRestaurantValues).then(() => {
          console.log('Restaurant Updated!');
        }).catch(err =>{
          console.log("err updating files")
        })
        }).catch(e => {
          return { ...data}
        })
      })
    }).catch(err =>{
      console.log("err updating files")
    })
  });

  // const getGooglePlacesData = async (places, restaurantId) => {
  //   return Promise.all(places.map(googlePlace => fetchGooglePlacesId(restaurantId, googlePlace)))
  // }

  // getGooglePlacesData(data.places, restaurant.google_id).then(data => {
  //   const axios = require('axios');
  //   params = {
  //     place_id: restaurant.google_id,
  //     fields: "rating,formatted_phone_number,opening_hours,vicinity",
  //     key: 'AIzaSyAP5rJS__ryEAgiFKsZMtMFDfsltB_1Vyc',
  //   }
  //   return axios.get('https://maps.googleapis.com/maps/api/place/details/json', { params }).then(response => {
  //     return { googleData: response.data.result }
  //   }).catch(e => {
  //     return { ...data}
  //   })
  // })

  // const updateRestaurant = async(places, googleId) => {
  //   return Promise.all(places.map(restaurant => getGooglePlacesData(googleId, restaurant)))
  // }

  // updateRestaurant(data.places, restaurantId).then(data => {

  //     const newRestaurantValues = {
  //       rating: googleData.rating,
  //       phone_number: googleData.formatted_phone_number,
  //       opening_hours: googleData.opening_hours,
  //       address: googleData.vicinity
  //     }
  //   return admin.firestore().doc(`restaurants/${restaurantId}`).update(newRestaurantValues).then(() => {
  //     console.log('Restaurant Updated!');
  //   }).catch(err =>{
  //     console.log("err fetching files")
  //   })
  // })


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
