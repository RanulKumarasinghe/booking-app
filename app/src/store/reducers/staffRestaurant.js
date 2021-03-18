// import { MEALS } from ../

import { SET_RESTAURANT, UPDATE_RESTAURANT, RESET } from '@/store/actions/staffRestaurant'

const initialState = {
  restaurant: null,
  restaurantOrders: [],
}

const restaurantReducer = (state = initialState, action) => {
  switch(action.type) {
    //Filters restaurant by name
    case SET_RESTAURANT:
      return {restaurant: action.restaurant}
    case UPDATE_RESTAURANT:
      // console.log(action)
      return {restaurant: {...action.restaurant, ...action.newRestaurantValues}}
    case RESET:
      return initialState
    default:
      return state;
  }
}

export default restaurantReducer;
