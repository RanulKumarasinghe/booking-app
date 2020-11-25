export const TOGGLE_FILTER = 'TOGGLE_FILTER';
import firebase from 'src/utils/firebase'

export const filterRestaurant = (name) => {
  return { type: TOGGLE_FILTER, restaurantName: name}
}

export const FETCH_ALL_RESTAURANTS = 'FETCH_ALL_RESTAURANTS';

export const fetchAllRestaurant = () => {
  return async dispatch => {
    const restaurants = await firebase.firestore().collection('restaurants')
    restaurants.get().then((querySnapshot) => {
      const restaurantArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_ALL_RESTAURANTS, restaurants: restaurantArray})
    })
  }
};

export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';

export const updateRestaurant = (saveRestaurant) => {
  return dispatch => {
    const restaurant = firebase.firestore().collection('restaurants').doc(saveRestaurant.id)
    restaurant.update({
      name: saveRestaurant.name,
      type: saveRestaurant.type,
      postCode: saveRestaurant.postCode,
      address: saveRestaurant.address,
      phone: saveRestaurant.phone,
      description: saveRestaurant.description,
      imageUrl: saveRestaurant.imageUrl,
      open: saveRestaurant.open,
      close: saveRestaurant.close,
      monday: saveRestaurant.monday,
      tuesday: saveRestaurant.tuesday,
      wednesday: saveRestaurant.wednesday,
      thursday: saveRestaurant.thursday,
      friday: saveRestaurant.friday,
      saturday: saveRestaurant.saturday,
      sunday: saveRestaurant.sunday,
    }).then(() => {
      console.log('User updated!');
    })
    dispatch({ type: UPDATE_RESTAURANT, restaurant: saveRestaurant })
  }
};
