export const TOGGLE_FILTER_TYPE = 'TOGGLE_FILTER_TYPE';
import firebase from 'src/utils/firebase'

export const filterFoodType = (name) => {
  return { type: TOGGLE_FILTER_TYPE, foodTypeName: name}
}

export const FETCH_ALL_FOOD_TYPES = 'FETCH_ALL_FOOD_TYPES';

export const fetchAllFoodTypes = () => {
  return async dispatch => {
    firebase.firestore().collection('foodTypes').get().then((querySnapshot) => {
      const foodTypeArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_ALL_FOOD_TYPES, foodType: foodTypeArray})
    }).catch(e=> {
      alert(e)
    })
  }
}
