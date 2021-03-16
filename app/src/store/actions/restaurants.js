export const TOGGLE_FILTER = 'TOGGLE_FILTER';
import firebase from 'src/utils/firebase'
import axios from 'axios'

export const filterRestaurant = (name) => {
  return { type: TOGGLE_FILTER, restaurantName: name}
}

export const FETCH_ALL_RESTAURANTS = 'FETCH_ALL_RESTAURANTS';

export const fetchAllRestaurant = () => {
  return async dispatch => {
      firebase.firestore().collection('restaurants').get().then((querySnapshot) => {
        let promiseArr = querySnapshot.docs.map((doc) => {
          const restaurantData = doc.data()

          params = {
            place_id: restaurantData.google_id,
            fields: "name,rating,formatted_phone_number,opening_hours,vicinity",
            key: 'AIzaSyAP5rJS__ryEAgiFKsZMtMFDfsltB_1Vyc',
          }
    
          return axios.get('https://maps.googleapis.com/maps/api/place/details/json', {params}).then(response => {
            return { ...restaurantData, id: doc.id, googleData: response.data.result }
          }).catch(e => {
            return { ...data, id: doc.id}
          })
        });
        //Resolves and Checks if there was any problem with executiong returns results.
        return Promise.all(promiseArr).then(restaurantArray => { 
          dispatch({ type: FETCH_ALL_RESTAURANTS, restaurants: restaurantArray})
        }).catch(e => {
          console.log('Nono')
          console.log(e)
        })
    })
  };
}


export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export const createRestaurant = (addRestaurant) => {
  // if(!context.auth) {
  //   return functions.https.HttpsError('unauthenticated', 'Endpoint requires authentication!');
  // }
  return dispatch => {
    firebase.firestore().collection('restaurants').add({
      name: addRestaurant.name,
      type: addRestaurant.type,
      postCode: addRestaurant.postCode,
      address: addRestaurant.address,
      phone: addRestaurant.phone,
      description: addRestaurant.description,
      imageUrl: addRestaurant.imageUrl,
      monday: addRestaurant.monday,
      monOpen: addRestaurant.monOpen,
      monClose: addRestaurant.monClose,
      tuesday: addRestaurant.tuesday,
      tuesOpen: addRestaurant.tuesOpen,
      tuesClose: addRestaurant.tuesClose,
      wednesday: addRestaurant.wednesday,
      wedOpen: addRestaurant.wedOpen,
      wedClose: addRestaurant.wedClose,
      thursday: addRestaurant.thursday,
      thursOpen: addRestaurant.thursOpen,
      thursClose: addRestaurant.thursClose,
      friday: addRestaurant.friday,
      friOpen: addRestaurant.friOpen,
      friClose: addRestaurant.friClose,
      saturday: addRestaurant.saturday,
      satOpen: addRestaurant.satOpen,
      satClose: addRestaurant.satClose,
      sunday: addRestaurant.sunday,
      sunOpen: addRestaurant.sunOpen,
      sunClose: addRestaurant.sunClose,
    }).then(() => {
      console.log('Restaurant Added!');
      dispatch({ type: ADD_RESTAURANT, restaurant: addRestaurant })
    }).catch(e => {
      console.log(e)
    })
  }
};



// const example = {
//     "formatted_phone_number": "01227 764388",
//     "name": "Olive Grove",
//     "opening_hours":  {
//       "open_now": true,
//       "periods":  [
//          {
//           "close":  {
//             "day": 0,
//             "time": "2230",
//           },
//           "open":  {
//             "day": 0,
//             "time": "1200",
//           },
//         },
//          {
//           "close":  {
//             "day": 1,
//             "time": "2300",
//           },
//           "open":  {
//             "day": 1,
//             "time": "1200",
//           },
//         },
//          {
//           "close":  {
//             "day": 2,
//             "time": "2300",
//           },
//           "open":  {
//             "day": 2,
//             "time": "1200",
//           },
//         },
//          {
//           "close":  {
//             "day": 3,
//             "time": "2300",
//           },
//           "open":  {
//             "day": 3,
//             "time": "1200",
//           },
//         },
//          {
//           "close":  {
//             "day": 4,
//             "time": "2300",
//           },
//           "open":  {
//             "day": 4,
//             "time": "1200",
//           },
//         },
//          {
//           "close":  {
//             "day": 5,
//             "time": "2300",
//           },
//           "open":  {
//             "day": 5,
//             "time": "1200",
//           },
//         },
//          {
//           "close":  {
//             "day": 6,
//             "time": "2300",
//           },
//           "open":  {
//             "day": 6,
//             "time": "1200",
//           },
//         },
//       ],
//       "weekday_text":  [
//         "Monday: 12:00 – 11:00 PM",
//         "Tuesday: 12:00 – 11:00 PM",
//         "Wednesday: 12:00 – 11:00 PM",
//         "Thursday: 12:00 – 11:00 PM",
//         "Friday: 12:00 – 11:00 PM",
//         "Saturday: 12:00 – 11:00 PM",
//         "Sunday: 12:00 – 10:30 PM",
//       ],
//     },
//     "rating": 4.2,
//     "vicinity": "12 Best Lane, Canterbury",
// }