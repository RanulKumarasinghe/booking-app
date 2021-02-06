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
      monday: saveRestaurant.monday,
      monOpen: saveRestaurant.monOpen,
      monClose: saveRestaurant.monClose,
      tuesday: saveRestaurant.tuesday,
      tuesOpen: saveRestaurant.tuesOpen,
      tuesClose: saveRestaurant.tuesClose,
      wednesday: saveRestaurant.wednesday,
      wedOpen: saveRestaurant.wedOpen,
      wedClose: saveRestaurant.wedClose,
      thursday: saveRestaurant.thursday,
      thursOpen: saveRestaurant.thursOpen,
      thursClose: saveRestaurant.thursClose,
      friday: saveRestaurant.friday,
      friOpen: saveRestaurant.friOpen,
      friClose: saveRestaurant.friClose,
      saturday: saveRestaurant.saturday,
      satOpen: saveRestaurant.satOpen,
      satClose: saveRestaurant.satClose,
      sunday: saveRestaurant.sunday,
      sunOpen: saveRestaurant.sunOpen,
      sunClose: saveRestaurant.sunClose,
    }).then(() => {
      console.log('Restaurant Updated!');
    })
    dispatch({ type: UPDATE_RESTAURANT, restaurant: saveRestaurant})
  }
};

export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export const createRestaurant = (addRestaurant) => {
  // if(!context.auth) {
  //   return functions.https.HttpsError('unauthenticated', 'Endpoint requires authentication!');
  // }
  return dispatch => {
    const restaurant = firebase.firestore().collection('restaurants')
    restaurant.add({
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
    })
    dispatch({ type: ADD_RESTAURANT, restaurant: addRestaurant })
  }
};

