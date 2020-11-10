// import { MEALS } from ../
import { RESTAURANT } from '@/other/dummy-data';
import { TOGGLE_FILTER } from '@/store/actions/restaurants'

const initialState = {
  restaurants: RESTAURANT,
  filteredRestaurant: RESTAURANT
}

const restaurantReducer = (state = initialState, action) => {
  switch(action.type) {
    //Filters restaurant by name
    case TOGGLE_FILTER:
      // Check if empty string
      if (action.restaurantName.length == 0) {
        return {...state, filteredRestaurant: state.restaurants}
      } else {
        filteredRestaurant = state.restaurants.filter(restaurant => restaurant.title.toLowerCase().includes(action.restaurantName.toLowerCase()));
        return {...state, filteredRestaurant: filteredRestaurant}
      }
    default:
      return state;
  }
}

export default restaurantReducer;