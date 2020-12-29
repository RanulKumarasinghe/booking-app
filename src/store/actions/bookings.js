import firebase from 'src/utils/firebase'

const FETCH_ALL_BOOKINGS = 'FETCH_ALL_BOOKINGS';
const FETCH_ALL_RESTAURANT_TIMES = 'FETCH_ALL_RESTAURANT_TIMES';

export const fetchAllBookings = () => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('bookings')
    bookings.get().then((querySnapshot) => {
      const bookingArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_ALL_BOOKINGS, payload: bookingArray })
    })
  }
};

export const fetchAllRestaurantTimes = (resID) => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('times').where('restaurantID', '==' , resID).get().then((querySnapshot) => {
      const timesArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_ALL_RESTAURANT_TIMES, payload: timesArray })
    })
  }
};