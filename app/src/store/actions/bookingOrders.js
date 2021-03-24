import Firebase, { db } from 'src/utils/firebase'

export const FETCH_BOOKINGS_BY_USER = 'FETCH_BOOKINGS_BY_USER'

export const fetchBookingsByUser = (userid) => {
  return async (dispatch) => {
    db.collection('bookings2')
      .where('cusid', '==', userid)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), docId: doc.id };
        });
        dispatch({ type: FETCH_BOOKINGS_BY_USER, payload: response });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const FETCH_BOOKINGS_BY_USER_FILTERED = 'FETCH_BOOKINGS_BY_USER_FILTERED'

export const fetchBookingsByUserFiltered = (userid) => {
  const now = new Date();
  return async (dispatch) => {
    db.collection('bookings2')
      .where('cusid', '==', userid)
      .where('date', '>', now)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), docId: doc.id };
        });
        dispatch({ type: FETCH_BOOKINGS_BY_USER_FILTERED, payload: response });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const CLEAR_USER_BOOKINGS = 'CLEAR_USER_BOOKINGS'

export const clearUserBookings = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CLEAR_USER_BOOKINGS, payload: true });
    } catch (error) {
      console.error(error);
    }
  };
};