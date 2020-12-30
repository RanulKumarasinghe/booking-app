import firebase from 'src/utils/firebase'

const FETCH_ALL_BOOKINGS = 'FETCH_ALL_BOOKINGS';
const FETCH_UNAVAILABLE_RESTAURANT_TIMES = 'FETCH_UNAVAILABLE_RESTAURANT_TIMES';

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

export const fetchUnavailableFromRestaurant = (resID, date) => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('times').where('restId', '==' , resID).get().then((querySnapshot) => {
      const timesArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data()}
      })
      console.log(timesArray[0].unavailable[date])
      dispatch({ type: FETCH_UNAVAILABLE_RESTAURANT_TIMES, payload: timesArray[0].unavailable[date] })
    })
  }
};