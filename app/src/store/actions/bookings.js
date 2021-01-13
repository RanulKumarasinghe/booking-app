import firebase from 'src/utils/firebase'

const FETCH_ALL_BOOKINGS = 'FETCH_ALL_BOOKINGS';
const FETCH_MY_BOOKINGS = 'FETCH_MY_BOOKINGS';
const FETCH_UNAVAILABLE_RESTAURANT_TIMES = 'FETCH_UNAVAILABLE_RESTAURANT_TIMES';
const POST_BOOKING_TIME = 'POST_BOOKING_TIME';
const POST_BOOKING = 'POST_BOOKING';
const RESPOND_TO_BOOKING = 'RESPOND_TO_BOOKING';

export const fetchAllBookings = (userId) => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('bookings').where('cusId', '==', userId);
    bookings.get().then((querySnapshot) => {
      const bookingArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_ALL_BOOKINGS, payload: bookingArray })
    })
  }
};

export const fetchMyBookings = (restName) => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('bookings').where('resName', '==', restName);
    bookings.get().then((querySnapshot) => {
      const bookingArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_MY_BOOKINGS, payload: bookingArray })
    })
  }
};

export const respondToBooking = (docId, response) => {
  console.log(docId);
  console.log(response);
  return async dispatch => {
    (async function () {
      console.log('Runs')
      const res = firebase.firestore().collection('bookings').doc(docId).update({
        confirmed: response,
      });
    })();
    dispatch({ type: RESPOND_TO_BOOKING, payload: undefined });
  }
};

export const fetchUnavailableFromRestaurant = (resID, date) => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('times').where('restId', '==', resID).get().then((querySnapshot) => {
      const timesArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data() }
      })
      dispatch({ type: FETCH_UNAVAILABLE_RESTAURANT_TIMES, payload: timesArray[0].unavailable[date] })
    })
  }
};

export const postBookingTime = (restaurantId, date, time) => {
  const dateMap = {}
  return async dispatch => {
    const query = await firebase.firestore().collection('times').where('restId', '==', restaurantId).get().then((querySnapshot) => {
      //What to do if no document of said restaurant exists
      if (querySnapshot.empty) {
        dateMap[date] = [time];
        (async function () {
          const res = firebase.firestore().collection('times').add({
            restId: restaurantId,
            unavailable: dateMap,
          })
        })();
        //If document already exists
      } else {
        const newUnavailable = {};
        const id = querySnapshot.docs[0].id;
        const queryData = querySnapshot.docs.map((doc) => {
          return { ...doc.data() }
        })

        //If no bookings on the day chosen
        if ((queryData[0].unavailable[date]) === undefined) {
          queryData[0].unavailable[date] = [time];
        } else {
          queryData[0].unavailable[date].push(time)
        }
        (async function () {
          const res = firebase.firestore().collection('times').doc(id).set({
            restId: restaurantId,
            unavailable: queryData[0].unavailable,
          })
        })();
      }
      //needs to be connected to reducer
      dispatch({ type: POST_BOOKING_TIME, payload: undefined })
    })
  }
}

/**Need to check if already exists such booking */
export const postBooking = (restaurantName, date, time, user, tableNum) => {
  return async dispatch => {
    (async function () {
      const res = firebase.firestore().collection('bookings').add({
        confirmed: false,
        cusId: user,
        date: date,
        resName: restaurantName,
        tables: tableNum,
        time: time
      })
    })();
    dispatch({ type: POST_BOOKING, payload: undefined })
  }
}