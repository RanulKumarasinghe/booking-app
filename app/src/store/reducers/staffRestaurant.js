// import { MEALS } from ../

import { FETCH_RESTAURANT, RESET } from '@/store/actions/staffRestaurant'

const initialState = {
  restaurant: null,
}

const restaurantReducer = (state = initialState, action) => {
  switch(action.type) {
    //Filters restaurant by name
    case FETCH_RESTAURANT:
      return {restaurant: action.restaurant}
    case RESET:
      return initialState
    default:
      return state;
  }
}

export default restaurantReducer;
