
export const initialState = {
  reservations: [],
  tables:[],
  bookings: [],
  bookingTimes: [],
  myBookings: []
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RESERVATIONS':
      return {
        ...state,
        reservations: action.payload
      }
      case 'FETCH_AVAILABLE_TABLES':{
        console.log(action.payload);
        return {
          ...state,
          tables: action.payload,
        }
      }
    case 'FETCH_ALL_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
      }
    case 'FETCH_UNAVAILABLE_RESTAURANT_TIMES':
      const times = { unavailable: action.payload }
      return {
        ...state,
        bookingTimes: times,
      }
    case 'FETCH_MY_BOOKINGS':
      return {
        ...state,
        myBookings: action.payload,
      }
    case 'ADD_NEW_BOOKING_TIME_DOCUMENT':
      return {
        ...state,
        bookingTimes: action.payload
      }
    default:
      return state;
  }
}

export default bookingsReducer