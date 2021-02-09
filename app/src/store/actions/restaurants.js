export const TOGGLE_FILTER = 'TOGGLE_FILTER';
import firebase from 'src/utils/firebase'

export const filterRestaurant = (name) => {
  return { type: TOGGLE_FILTER, restaurantName: name}
}

export const FETCH_ALL_RESTAURANTS = 'FETCH_ALL_RESTAURANTS';

export const fetchAllRestaurant = () => {
  return async dispatch => {
    try { 
      const restaurants = await firebase.firestore().collection('restaurants')
      restaurants.get().then((querySnapshot) => {
        const restaurantArray = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
        dispatch({ type: FETCH_ALL_RESTAURANTS, restaurants: restaurantArray})
      })
    } catch (e) {
      console.log(e)
    }
  }
};

export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';

export const updateRestaurant = (saveRestaurant) => {
  return dispatch => {
    firebase.firestore().collection('restaurants').doc(saveRestaurant.id).update({
      name: saveRestaurant.name,
      type: saveRestaurant.type,
      description: saveRestaurant.description,
      imageUrl: saveRestaurant.imageUrl,
      google_id: saveRestaurant.google_id,
      staffId:saveRestaurant.staffId
    }).then(newRestaurant => {
      // TODO
      // dispatch({ type: UPDATE_RESTAURANT, restaurant: newRestaurant})
      dispatch({ type: UPDATE_RESTAURANT, restaurant: saveRestaurant})
      console.log('Restaurant Updated!');
    }).catch(e => {
      console.log(e)
    })
  }
}

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

