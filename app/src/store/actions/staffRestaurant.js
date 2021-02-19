import Firebase, {db} from 'src/utils/firebase'


export const FETCH_RESTAURANT = 'FETCH_ALL_RESTAURANTS';

export const fetchUserRestaurant = (userId) => {
  return async dispatch => {
    db.collection('restaurants').where("staffIds", "array-contains", userId).get()
    .then((querySnapshot) => {
      const restaurants = querySnapshot.docs
      if (restaurants.length > 0) {
        restaurants.forEach((doc, index) => {
          if (index == 0)
            dispatch({ type: FETCH_RESTAURANT, restaurant: { ...doc.data(), id: doc.id }})
          });
      } else {
        dispatch({ type: FETCH_RESTAURANT, restaurant: null})
      }
    })
    .catch(e => {
    console.log(e)
  })
  }
};



