
export const initialState = {
  bookings: [],
  myBookings:[]
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
      }
    case 'FETCH_UNAVAILABLE_RESTAURANT_TIMES':
      const times = { times: { unavailable: action.payload } }
      return {
        ...state,
        bookings: times,
      }
    case 'FETCH_MY_BOOKINGS':
      return {
        ...state,
        myBookings: action.payload,
      }
    default:
      return state;
  }
}

export default bookingsReducer