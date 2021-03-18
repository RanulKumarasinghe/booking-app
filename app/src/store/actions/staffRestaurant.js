import Firebase, { db } from 'src/utils/firebase'
import axios from 'axios'

export const RESET = 'RESET';

export const SET_RESTAURANT = 'SET_RESTAURANT';

export const fetchUserRestaurant = (userId) => {
  return async dispatch => {
    db.collection('restaurants').where("staffIds", "array-contains", userId).get()
      .then((querySnapshot) => {
        const restaurants = querySnapshot.docs
        if (restaurants.length > 0) {
          return { id: restaurants[0].id, ...restaurants[0].data() }
        }
      }).then(data => {
        //get Google Data
        return getGoogleData(data.google_id).then(googleData => {
          return { restaurant: {...data, ...googleData }}
        })
      }).then(data => {
        //Get Orders
        return getOrders(data.restaurant.id).then(orders => {
          return { ...data, ...orders}
        })
      }).then(data => {
        dispatch({
          type: SET_RESTAURANT, ...data})
      })
      .catch(e => {
        console.log('Something bad happened fetching staff restaurant')
      })
  }
};

const getGoogleData = (googleId) => {
  //Get Data From Google For Each Restaurant
  params = {
    place_id: googleId,
    fields: "name,rating,formatted_phone_number,opening_hours,vicinity",
    key: 'AIzaSyAP5rJS__ryEAgiFKsZMtMFDfsltB_1Vyc',
  }
  return axios.get('https://maps.googleapis.com/maps/api/place/details/json', { params }).then(response => {
    return { googleData: response.data.result }
  }).catch(e => {
    console.log('No google data found')
    return { }
  })
}
 
const getOrders = (restaurantId) => {
  return db.collection(`restaurants/${restaurantId}/orders`).get()
  .then((querySnapshot) => {
    const ordersArray = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }
    })
    return { restaurantOrders: ordersArray }
  }).catch(e => {
    console.log('No Orders found')
    return {}
  })
}

export const UPDATE_RESTAURANT = "UPDATE_RESTAURANT"

export const updateRestaurant = (restaurantId, saveRestaurant) => {
  return dispatch => {
    const newRestaurantValues = {
      name: saveRestaurant.name,
      type: saveRestaurant.type,
      description: saveRestaurant.description,
      imageUrl: saveRestaurant.imageUrl,
      google_id: saveRestaurant.google_id
    }
    db.collection('restaurants').doc(restaurantId).update(newRestaurantValues).then(() => {
      dispatch({ type: UPDATE_RESTAURANT, newRestaurantValues: newRestaurantValues })
      console.log('Restaurant Updated!');
    }).catch(e => {
      console.log('Restaurant Failed to Update!');
      console.log(e)
    })
  }
}



