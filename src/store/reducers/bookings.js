import {GET_BOOKINGS} from '../actions/bookings'

const initialState = {
    bookingList: []
}

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_BOOKINGS:
        return {...state, restaurants: action.restaurants, filteredRestaurant: action.restaurants}
      default:
        return state;
    }
  }

  export default bookingReducer