import firebase from 'src/utils/firebase'

const FETCH_ALL_BOOKINGS = 'FETCH_ALL_BOOKINGS';
const FETCH_MY_BOOKINGS = 'FETCH_MY_BOOKINGS';
const FETCH_UNAVAILABLE_RESTAURANT_TIMES = 'FETCH_UNAVAILABLE_RESTAURANT_TIMES';
const POST_BOOKING_TIME = 'POST_BOOKING_TIME';
const POST_BOOKING = 'POST_BOOKING';
const RESPOND_TO_BOOKING = 'RESPOND_TO_BOOKING';
const ADD_NEW_BOOKING_TIME_DOCUMENT = 'ADD_NEW_BOOKING_TIME_DOCUMENT';

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

export const fetchMyBookings = (restId) => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('bookings').where('restId', '==', restId);
    bookings.get().then((querySnapshot) => {
      const bookingArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      });
      dispatch({ type: FETCH_MY_BOOKINGS, payload: bookingArray })
    })
  }
};

//Not IMPLEMENTED YET
export const fetchMyBookingsByDate = (restId, timestamp) => {
  const futureTimestamp = addDays(new Date(timestamp), 7);
  return async dispatch => {
    const bookings = await firebase.firestore().collection('bookings').where('restId', '==', restName).where('timestamp', '>=', timestamp).where('timestamp', '<=', futureTimestamp);
    bookings.get().then((querySnapshot) => {
      const bookingArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      });
      dispatch({ type: FETCH_MY_BOOKINGS, payload: bookingArray })
    })
  }
};

export const respondToBooking = (docId, response) => {
  return async dispatch => {
    (async function () {
      const res = firebase.firestore().collection('bookings').doc(docId).update({
        confirmed: response,
      });
    })();
    dispatch({ type: RESPOND_TO_BOOKING, payload: undefined });
  }
};

export const addNewBookingTimeDocument = (resID) => {

  const newDocument = {
    restId: resID,
    unavailable: [],
  }

  return async dispatch => {
    (async function () {
      firebase.firestore().collection('times').add(newDocument);
    })();
  }
  dispatch({ type: ADD_NEW_BOOKING_TIME_DOCUMENT, payload: newDocument })
}

export const fetchUnavailableFromRestaurant = (resID, date) => {
  return async dispatch => {
    const bookings = await firebase.firestore().collection('times').where('restId', '==', resID).get().then((querySnapshot) => {
      const timesArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data() }
      })

      if (timesArray.length === 0) {
        addNewBookingTimeDocument(resID);
      } else {
        dispatch({ type: FETCH_UNAVAILABLE_RESTAURANT_TIMES, payload: timesArray[0].unavailable[date] })
      }
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
export const postBooking = (restaurantId, restaurantName, date, time, user, tableNum) => {

  const substring = date.split('/');
  const reformDate = substring[2] + "/" + substring[1] + "/" + substring[0];

  return async dispatch => {
    (async function () {
      const res = firebase.firestore().collection('bookings').add({
        confirmed: null,
        cusId: user,
        date: date,
        restId: restaurantId,
        restName: restaurantName,
        tables: tableNum,
        time: time,
        timeStamp: new Date(reformDate).getTime()
      })
    })();
    dispatch({ type: POST_BOOKING, payload: undefined })
  }
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
