// import { MEALS } from ../

import {
  FETCH_BOOKINGS_BY_USER,
  FETCH_BOOKINGS_BY_USER_FILTERED,
  CLEAR_USER_BOOKINGS,
} from '@/store/actions/bookingOrders';

const initialState = {
  bookingOrders: [],
};

const bookingOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_BY_USER: {
      const now = new Date();
      action.payload.forEach((element) => {
        if (now.getTime() > element.date.toDate().getTime() && element.status === 'Ok') {
          //dispatch(postBookingExpiration(element.docId));
          element.status = 'expired';
        } else {
        }
      });
      return {
        ...state,
        bookingOrders: action.payload,
      }
    }
    case FETCH_BOOKINGS_BY_USER_FILTERED: {
      return {
        ...state,
        bookingOrders: action.payload,
      }
    }
    case CLEAR_USER_BOOKINGS: {
      return {
        ...state,
        bookingOrders: [],
      }
    } 
    default:
      return state;
  }
};

export default bookingOrdersReducer;
