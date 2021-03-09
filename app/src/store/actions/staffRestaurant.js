import Firebase, {db} from 'src/utils/firebase'

export const RESET = 'RESET';

export const SET_RESTAURANT = 'SET_RESTAURANT';

export const fetchUserRestaurant = (userId) => {
  return async dispatch => {
    db.collection('restaurants').where("staffIds", "array-contains", userId).get()
    .then((querySnapshot) => {
      const restaurants = querySnapshot.docs
      if (restaurants.length > 0) {
        restaurants.forEach((doc, index) => {
          if (index == 0)
            dispatch({ type: SET_RESTAURANT, restaurant: { ...doc.data(), id: doc.id }})
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
      dispatch({ type: UPDATE_RESTAURANT, newRestaurantValues: newRestaurantValues})
      console.log('Restaurant Updated!');
    }).catch(e => {
      console.log('Restaurant Failed to Update!');
      console.log(e)
    })
  }
}



