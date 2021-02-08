import firebase from 'src/utils/firebase'

const FETCH_TABLES = 'FETCH_TABLES';
const FETCH_AVAILABLE_TABLES = 'FETCH_AVAILABLE_TABLES';
const ADD_TABLE = 'ADD_TABLE';
const POST_TABLE = 'POST_TABLE';

//Down from here obsolete
const FETCH_ALL_BOOKINGS = 'FETCH_ALL_BOOKINGS';
const FETCH_MY_BOOKINGS = 'FETCH_MY_BOOKINGS';
const FETCH_UNAVAILABLE_RESTAURANT_TIMES = 'FETCH_UNAVAILABLE_RESTAURANT_TIMES';
const POST_BOOKING_TIME = 'POST_BOOKING_TIME';
const POST_BOOKING = 'POST_BOOKING';
const RESPOND_TO_BOOKING = 'RESPOND_TO_BOOKING';
const ADD_NEW_BOOKING_TIME_DOCUMENT = 'ADD_NEW_BOOKING_TIME_DOCUMENT';

//Internal actions (not involving the firestore databse)
//
//
export const addTable = (table) => {
  return async dispatch => {
    try{
      dispatch({ type: ADD_TABLE, payload: table });
    }catch(error){
      console.error(error);
    }
  }
}

//External fetching actions (involving the firestore database but not affecting it)
//
//
export const fetchTables = (restid) => {
  return async dispatch => {
    try {
      firebase.firestore().collection('reservations').where('restid', '==', restid).get().then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), docId: doc.id }
        });
        dispatch({ type: FETCH_TABLES, payload: response });
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const fetchAvailableTables = (size, restid, day, month, year, start, end) => {
  return async dispatch => {
    availableTables = [];
    try {
      firebase.firestore().collection('reservations').where('restid', '==', restid).where('size', '==', parseInt(size)).get().then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return { ...doc.data()[`Y${year}`][`M${month - 1}`][`D${day - 1}`], id: doc.id }
        });
        response.forEach(object => {
          const values = Object.values(object);
          if (object[`${start}`] === undefined) {
            if (!values.includes(end)) {
              availableTables.push(object);
            }
          }
        });
        dispatch({ type: FETCH_AVAILABLE_TABLES, payload: availableTables })
      });
    } catch (error) {
      console.error(error);
    }
  }
}

//External posting actions (involving the firestore database and changing it)
//
//
export const postTable = (restid, table) => {
  (async function () {
    try {
      const res = await firebase.firestore().collection('reservations').add({
        id: table.id,
        size: table.size,
        restid: restid,
      });
    } catch (error) {
      console.error(error);
    }
  })();

  return async dispatch => {
    dispatch({ type: POST_TABLE, payload: undefined })
  }
}

//VIP
export const postReservation = (tableId, day, month, year, start, end) => {
  const nestedQuery = `Y${year}.M${month}.D${day}.${start}`;
  (async function () {
    const res = await firebase.firestore().collection('reservations').doc(tableId).update({
      [nestedQuery]: end
    })
  })();

  return async dispatch => {
    dispatch({ type: POST_BOOKING, payload: undefined })
  }
}

//
//
//Past this is discontinued
//
//

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
