// import { MEALS } from ../

import {
  SET_RESTAURANT,
  UPDATE_RESTAURANT,
  RESET,
  ACCEPT_ORDER,
  FETCH_BOOKINGS_BY_RESTAURANT_FILTERED,
  FETCH_BOOKINGS_BY_RESTAURANT,
} from '@/store/actions/staffRestaurant';

const initialState = {
  restaurant: null,
  restaurantOrders: [],
  restaurantBookings: []
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    //Filters restaurant by name
    case SET_RESTAURANT:
      return {
        restaurant: action.restaurant,
        restaurantOrders: action.restaurantOrders,
      };
    case UPDATE_RESTAURANT:
      return {
        restaurant: {...state.restaurant, ...action.newRestaurantValues},
        restaurantOrders: {...state.restaurantOrders},
      };
    case ACCEPT_ORDER:
      let index = 0
      //Get cart without the item about to be added.

      let newOrders = [...state.restaurantOrders]

      newOrders.forEach((order, i) => {
        if (order.id == action.orderId) {
          index == i
          return 
        }
      });
      newOrders[index]['status'] = 'accepted'
      console.log(newOrders[index])
      return {...state, restaurantOrders: newOrders};
    case RESET:
      return initialState;
    case FETCH_BOOKINGS_BY_RESTAURANT: {
      const now = new Date();
      action.payload.forEach((element) => {
        if (!element.cart && element.date && now.getTime() > element.date.toDate().getTime() && element.status === 'Ok') {
          //dispatch(postBookingExpiration(element.docId));
          element.status = 'expired';
        } else {

        }
      });
      return {
        ...state,
        restaurantBookings: action.payload,
      }
    }
    case FETCH_BOOKINGS_BY_RESTAURANT_FILTERED: {
      return {
        ...state,
        restaurantBookings: action.payload,
      }
    }
    default:
      return state;
  }
};

export default restaurantReducer;
