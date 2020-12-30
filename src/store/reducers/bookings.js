
export const initialState = {
  bookings: []
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_BOOKINGS':
    return {
        ...state, 
        bookings:action.payload,
      }
      case 'FETCH_UNAVAILABLE_RESTAURANT_TIMES':
      const times = {times:action.payload}
      return {
          ...state,
          bookings:times,
        }
    default:
      return state;
  }
}

export default bookingsReducer