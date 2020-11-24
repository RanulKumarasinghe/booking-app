import firebase from 'src/utils/firebase'

export const GET_BOOKINGS = 'GET_BOOKINGS'

export const getBookings = () => {
  return async dispatch => {
    const restaurants = await firebase.firestore().collection('bookings')
    restaurants.get().then((snapshot) => {
      const bookingArray = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: GET_BOOKINGS, restaurants: bookingArray})
    })
  }
};