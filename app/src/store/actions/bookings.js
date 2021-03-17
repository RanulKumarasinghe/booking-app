import firebase from 'src/utils/firebase';
import {useSelector, useDispatch} from 'react-redux';

const FETCH_TABLES = 'FETCH_TABLES';
const FETCH_TABLES_BY_SIZE = 'FETCH_TABLES_BY_SIZE';
const FETCH_BOOKINGS_BY_SIZE = 'FETCH_BOOKINGS_BY_SIZE';
const ADD_TABLE = 'ADD_TABLE';
const ADD_TIME = 'ADD_TIME';
const PERFORM_SCHEDULE = 'PERFORM_SCHEDULE';
const POST_TABLE = 'POST_TABLE';
const FETCH_BOOKINGS_BY_USER = 'FETCH_BOOKINGS_BY_USER';
const FETCH_BOOKINGS_BY_USER_FILTERED = 'FETCH_BOOKINGS_BY_USER_FILTERED';
const Clear_User_Bookings = 'Clear_User_Bookings';
const CLEAR_TIME = 'CLEAR_TIME';
const POST_RESERVATION_CANCELATION = 'POST_RESERVATION_CANCELATION';
const FETCH_BOOKINGS_BY_RESTAURANT = 'FETCH_BOOKINGS_BY_RESTAURANT';
const FETCH_BOOKINGS_BY_RESTAURANT_FILTERED =
  'FETCH_BOOKINGS_BY_RESTAURANT_FILTERED';
const POST_BOOKING_EXPIRATION = 'POST_BOOKING_EXPIRATION';
const CLEAR_TABLES = 'CLEAR_TABLES';
const REMOVE_TABLE = 'REMOVE_TABLE';
const REMOVE_TABLE_FROM_DATABASE = 'REMOVE_TABLE_FROM_DATABASE';
const UNAVAILABLE_TABLES = 'UNAVAILABLE_TABLES';

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

export const clearUserBookings = () => {
  return async (dispatch) => {
    try {
      dispatch({type: Clear_User_Bookings, payload: true});
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearTime = () => {
  return async (dispatch) => {
    try {
      dispatch({type: CLEAR_TIME, payload: true});
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearTables = () => {
  return async (dispatch) => {
    try {
      dispatch({type: CLEAR_TABLES, payload: true});
    } catch (error) {
      console.error(error);
    }
  };
};

export const addTable = (table) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_TABLE, payload: table});
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeTable = (table) => {
  return async (dispatch) => {
    try {
      dispatch({type: REMOVE_TABLE, payload: table});
    } catch (error) {
      console.error(error);
    }
  };
};

export const addTime = (start, end) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_TIME, payload: {start, end}});
    } catch (error) {
      console.error(error);
    }
  };
};

export const performSchedule = () => {
  return async (dispatch) => {
    try {
      dispatch({type: PERFORM_SCHEDULE, payload: true});
    } catch (error) {
      console.error(error);
    }
  };
};

//External fetching actions (involving the firestore database but not affecting it)
//
//

export const checkTableAvailability = (size, restid, date) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('reservations')
      .where('restid', '==', restid)
      .where('size', '>=', parseInt(size))
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        const tableResponse = querySnapshot.docs.map((doc) => {
          return {...doc.data(), id: doc.id};
        });

        let promiseArr = tableResponse.map(table => {
          //Set ChannelGroup to user
          //TODO: Add fetch booking on picked date
            return firebase
            .firestore()
            .collection('bookings2')
            .where('tableref', '==', table.id)
            .get()
            .then((querySnapshot) => {
              const bookingResponse = querySnapshot.docs.map((doc) => {
                return {date: doc.data().date, tableref: table.id};
              });

              //returns an array of 
              let bookedArray = bookingResponse.map((booking) => {
                const dateConv = booking.date.toDate();
                if (
                  dateConv.getFullYear() === date.getFullYear() &&
                  dateConv.getMonth() === date.getMonth() &&
                  dateConv.getDate() === date.getDate()
                ) {
                  return booking.tableref;
                } else {
                  return false
                }
              });
              return bookedArray
            }).catch(console.log);
        });
        //Resolves and Checks if there was any problem with executiong returns results.
        return Promise.all(promiseArr)
      })
      .then(tablesBookedArray => {
        let tablesBooked = tablesBookedArray.flat().filter(table => table != false)
        console.log(tablesBooked)
        // console.log(resultsArray)
        dispatch({type: UNAVAILABLE_TABLES, payload: tablesBooked});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchTables = (restid) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('reservations')
      .where('restid', '==', restid)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return {...doc.data(), docId: doc.id};
        });
        dispatch({type: FETCH_TABLES, payload: response});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchTablesBySize = (size, restid) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('reservations')
      .where('restid', '==', restid)
      .where('size', '>=', parseInt(size))
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return {...doc.data(), id: doc.id};
        });
        dispatch({type: FETCH_TABLES_BY_SIZE, payload: response});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchBookingsBySize = (size, restid) => {
  const now = new Date();
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('bookings2')
      .where('guests', '==', size)
      .where('restid', '==', restid)
      .where('date', '>', now)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return {...doc.data(), docId: doc.id};
        });
        dispatch({type: FETCH_BOOKINGS_BY_SIZE, payload: response});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchBookingsByRestaurant = (restid) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('bookings2')
      .where('restid', '==', restid)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return {...doc.data(), docId: doc.id};
        });
        dispatch({type: FETCH_BOOKINGS_BY_RESTAURANT, payload: response});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchBookingsByRestaurantFiltered = (restid) => {
  const now = new Date();
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('bookings2')
      .where('restid', '==', restid)
      .where('date', '>', now)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return {...doc.data(), docId: doc.id};
        });
        dispatch({
          type: FETCH_BOOKINGS_BY_RESTAURANT_FILTERED,
          payload: response,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchBookingsByUser = (userid) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('bookings2')
      .where('cusid', '==', userid)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return {...doc.data(), docId: doc.id};
        });
        dispatch({type: FETCH_BOOKINGS_BY_USER, payload: response});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchBookingsByUserFiltered = (userid) => {
  const now = new Date();
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('bookings2')
      .where('cusid', '==', userid)
      .where('date', '>', now)
      .get()
      .then((querySnapshot) => {
        const response = querySnapshot.docs.map((doc) => {
          return {...doc.data(), docId: doc.id};
        });
        dispatch({type: FETCH_BOOKINGS_BY_USER_FILTERED, payload: response});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

//External posting actions (involving the firestore database and changing it)
//
//
export const postTable = async (restid, table) => {
  return async (dispatch) => {
    try {
      const res = await firebase.firestore().collection('reservations').add({
        size: table.size,
        number: table.number,
        attributeIndexes: table.attributeIndexes,
        restid: restid,
        active: false,
      });
      dispatch({type: POST_TABLE, payload: undefined});
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeTableFromDatabase = async (tableid) => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .firestore()
        .collection('reservations')
        .doc(tableid)
        .delete();
      dispatch({type: REMOVE_TABLE_FROM_DATABASE, payload: undefined});
    } catch (error) {
      console.error(error);
    }
  };
};

export const postReservation = async (
  tableid,
  restid,
  user,
  guests,
  date,
  restname,
  tableNum
) => {
  return async (dispatch) => {
    try {
      const res = await firebase.firestore().collection('bookings2').add({
        cusid: user,
        date: date,
        status: 'Ok',
        tableref: tableid,
        guests: guests,
        restid: restid,
        restname: restname,
        tableNumber: tableNum,
      });
      dispatch({type: POST_BOOKING, payload: undefined});
    } catch (error) {
      console.error(error);
    }
  };
};

export const postReservationCancelation = (bookingId) => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .firestore()
        .collection('bookings2')
        .doc(bookingId)
        .update({
          status: 'cancelled',
        });
      dispatch({type: POST_RESERVATION_CANCELATION, payload: undefined});
    } catch (error) {
      console.error(error);
    }
  };
};

export const postBookingExpiration = async (bookingId) => {
  try {
    const res = await firebase
      .firestore()
      .collection('bookings2')
      .doc(bookingId)
      .update({
        status: 'expired',
      });
    dispatch({type: POST_BOOKING_EXPIRATION, payload: undefined});
  } catch (error) {
    console.error(error);
  }
};

export const postActivatedTables = (restId, tables) => {
  return async (dispatch) => {
    try {
      const response = await firebase
        .firestore()
        .collection('reservations')
        .where('restid', '==', restId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async function (doc) {
            const query = await firebase
              .firestore()
              .collection('reservations')
              .doc(doc.id)
              .update({
                active: false,
              });
          });
        });

      tables.forEach(async function (element) {
        const res = await firebase
          .firestore()
          .collection('reservations')
          .doc(element.docId)
          .update({
            active: true,
          });
      });
    } catch (error) {
      console.error(error);
    }

    dispatch({type: POST_BOOKING_EXPIRATION, payload: undefined});
  };
};

//
//
//Past this is discontinued and not used
//
//

export const fetchAllBookings = (userId) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection('bookings')
      .where('cusId', '==', userId)
      .get()
      .then((querySnapshot) => {
        const bookingArray = querySnapshot.docs.map((doc) => {
          return {...doc.data(), id: doc.id};
        });
        dispatch({type: FETCH_ALL_BOOKINGS, payload: bookingArray});
      })
      .catch((e) => console.log(e));
  };
};

export const fetchMyBookings = (restId) => {
  return async (dispatch) => {
    const bookings = await firebase
      .firestore()
      .collection('bookings')
      .where('restId', '==', restId);
    bookings.get().then((querySnapshot) => {
      const bookingArray = querySnapshot.docs.map((doc) => {
        return {...doc.data(), id: doc.id};
      });
      dispatch({type: FETCH_MY_BOOKINGS, payload: bookingArray});
    });
  };
};

//Not IMPLEMENTED YET
export const fetchMyBookingsByDate = (restId, timestamp) => {
  const futureTimestamp = addDays(new Date(timestamp), 7);
  return async (dispatch) => {
    const bookings = await firebase
      .firestore()
      .collection('bookings')
      .where('restId', '==', restName)
      .where('timestamp', '>=', timestamp)
      .where('timestamp', '<=', futureTimestamp);
    bookings.get().then((querySnapshot) => {
      const bookingArray = querySnapshot.docs.map((doc) => {
        return {...doc.data(), id: doc.id};
      });
      dispatch({type: FETCH_MY_BOOKINGS, payload: bookingArray});
    });
  };
};

export const respondToBooking = (docId, response) => {
  return async (dispatch) => {
    (async function () {
      const res = firebase
        .firestore()
        .collection('bookings')
        .doc(docId)
        .update({
          confirmed: response,
        });
    })();
    dispatch({type: RESPOND_TO_BOOKING, payload: undefined});
  };
};

export const addNewBookingTimeDocument = (resID) => {
  const newDocument = {
    restId: resID,
    unavailable: [],
  };

  return async (dispatch) => {
    (async function () {
      firebase.firestore().collection('times').add(newDocument);
    })();
  };
  dispatch({type: ADD_NEW_BOOKING_TIME_DOCUMENT, payload: newDocument});
};

export const fetchUnavailableFromRestaurant = (resID, date) => {
  return async (dispatch) => {
    const bookings = await firebase
      .firestore()
      .collection('times')
      .where('restId', '==', resID)
      .get()
      .then((querySnapshot) => {
        const timesArray = querySnapshot.docs.map((doc) => {
          return {...doc.data()};
        });

        if (timesArray.length === 0) {
          addNewBookingTimeDocument(resID);
        } else {
          dispatch({
            type: FETCH_UNAVAILABLE_RESTAURANT_TIMES,
            payload: timesArray[0].unavailable[date],
          });
        }
      });
  };
};

export const postBookingTime = (restaurantId, date, time) => {
  const dateMap = {};
  return async (dispatch) => {
    const query = await firebase
      .firestore()
      .collection('times')
      .where('restId', '==', restaurantId)
      .get()
      .then((querySnapshot) => {
        //What to do if no document of said restaurant exists
        if (querySnapshot.empty) {
          dateMap[date] = [time];
          (async function () {
            const res = firebase.firestore().collection('times').add({
              restId: restaurantId,
              unavailable: dateMap,
            });
          })();
          //If document already exists
        } else {
          const newUnavailable = {};
          const id = querySnapshot.docs[0].id;
          const queryData = querySnapshot.docs.map((doc) => {
            return {...doc.data()};
          });

          //If no bookings on the day chosen
          if (queryData[0].unavailable[date] === undefined) {
            queryData[0].unavailable[date] = [time];
          } else {
            queryData[0].unavailable[date].push(time);
          }
          (async function () {
            const res = firebase.firestore().collection('times').doc(id).set({
              restId: restaurantId,
              unavailable: queryData[0].unavailable,
            });
          })();
        }
        //needs to be connected to reducer
        dispatch({type: POST_BOOKING_TIME, payload: undefined});
      });
  };
};

/**Need to check if already exists such booking */
export const postBooking = (
  restaurantId,
  restaurantName,
  date,
  time,
  user,
  tableNum
) => {
  const substring = date.split('/');
  const reformDate = substring[2] + '/' + substring[1] + '/' + substring[0];

  return async (dispatch) => {
    (async function () {
      const res = firebase
        .firestore()
        .collection('bookings')
        .add({
          confirmed: null,
          cusId: user,
          date: date,
          restId: restaurantId,
          restName: restaurantName,
          tables: tableNum,
          time: time,
          timeStamp: new Date(reformDate).getTime(),
        });
    })();
    dispatch({type: POST_BOOKING, payload: undefined});
  };
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
