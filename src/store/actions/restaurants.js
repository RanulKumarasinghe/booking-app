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

export const updateRestaurant = (id, name, type, postCode, address, phone, description, imageUrl, open, close, monday, tuesday, wednesday, thursday, friday, saturday, sunday) => {
  return async dispatch => {
    const restaurant = firestore().collection('restaurants').doc(id)
    restaurant.update({
      name: name,
      type: type,
      postCode: postCode,
      address: address,
      phone: phone,
      description: description,
      imageUrl: imageUrl,
      open: open,
      close: close,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    }).then(() => {
      console.log('User updated!');
    })
    dispatch({ type: UPDATE_RESTAURANT })
  }
};
