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
          restaurants.forEach((doc, index) => {
            if (index == 0) {
              const restaurantData = doc.data()

              params = {
                place_id: restaurantData.google_id,
                fields: "name,rating,formatted_phone_number,opening_hours,vicinity",
                key: 'AIzaSyAP5rJS__ryEAgiFKsZMtMFDfsltB_1Vyc',
              }

              return axios.get('https://maps.googleapis.com/maps/api/place/details/json', { params }).then(response => {
                dispatch({
                  type: SET_RESTAURANT, restaurant: {
                    ...restaurantData,
                    id: doc.id,
                    googleData: response.data.result
                  }
                })
              }).catch(e => {
                dispatch({
                  type: SET_RESTAURANT, restaurant: {
                    ...restaurantData, id: doc.id 
                }})
              })
            }
          });
        } else {
          dispatch({ type: RESET })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
};

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



