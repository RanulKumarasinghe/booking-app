// import { MEALS } from ../
import { RESTAURANT } from '@/other/dummy-data';
import { ADD_RESTAURANT, TOGGLE_FILTER } from '@/store/actions/restaurants'
import { FETCH_ALL_RESTAURANTS } from '@/store/actions/restaurants'
import { UPDATE_RESTAURANT } from '@/store/actions/restaurants';

const initialState = {
  restaurants: [],
  filteredRestaurant: []
}

const restaurantReducer = (state = initialState, action) => {
  switch(action.type) {
    //Filters restaurant by name
    case TOGGLE_FILTER:
      // Check if empty string
      if (action.restaurantName.length == 0) {
        return {...state, filteredRestaurant: state.restaurants}
      } else {
        filteredRestaurant = state.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(action.restaurantName.toLowerCase()));
        return {...state, filteredRestaurant: filteredRestaurant}
      }
    case FETCH_ALL_RESTAURANTS:
      return {...state, restaurants: action.restaurants, filteredRestaurant: action.restaurants}
    case ADD_RESTAURANT:
      return {
        ...state, restaurants: {...state.restaurants}
      }
     default:
      return state;
  }
}

export default restaurantReducer;
