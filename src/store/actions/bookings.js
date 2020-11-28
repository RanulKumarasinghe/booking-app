import firebase from 'src/utils/firebase'

const FETCH_ALL_BOOKINGS = 'FETCH_ALL_BOOKINGS';

export const fetchAllBookings = () => {
    return async dispatch => {
      const bookings = await firebase.firestore().collection('bookings')
      bookings.get().then((querySnapshot) => {
        const bookingArray = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
        dispatch({ type: FETCH_ALL_BOOKINGS, bookings: bookingArray})
      })
    }
  };