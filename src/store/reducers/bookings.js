
export const initialState = {
  bookings: []
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_BOOKINGS':
    console.log("Something is happening");
    return {
        ...state, 
        bookings:action.bookings,
      }
    default:
      return state;
  }
}

export default bookingsReducer