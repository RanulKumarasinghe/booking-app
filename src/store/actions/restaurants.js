export const TOGGLE_FILTER = 'TOGGLE_FILTER';
import firebase from 'src/utils/firebase'

export const filterRestaurant = (name) => {
  return { type: TOGGLE_FILTER, restaurantName: name}
}

export const FETCH_ALL_RESTAURANTS = 'FETCH_ALL_RESTAURANTS';

export const fetchAllRestaurant = () => {
  console.log('Test')
  return async dispatch => {
    console.log('Test')
    const restaurants = await firebase.firestore().collection('restaurants')
    restaurants.get().then((querySnapshot) => {
      const restaurantArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_ALL_RESTAURANTS, restaurants: restaurantArray})
    })
  }
};