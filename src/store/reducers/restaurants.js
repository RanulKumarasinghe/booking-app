// import { MEALS } from ../
import { RESTAURANT } from '@/other/dummy-data';
import { ADD_RESTAURANT, TOGGLE_FILTER } from '@/store/actions/restaurants'
import { FETCH_ALL_RESTAURANTS } from '@/store/actions/restaurants'
import { UPDATE_RESTAURANT } from '@/store/actions/restaurants';
import { act } from 'react-test-renderer';


const initialState = {
  restaurants: [],
  filteredRestaurant: []
}

// const editState = {
//   name: " ",
//   type: " ",
//   postCode: " ",
//   address: " ",
//   phone: " ",
//   description: " ",
//   imageUrl: " ",
//   open: " ",
//   close: " ",
//   monday: true,
//   tuesday: true,
//   wednesday: true,
//   thursday: true,
//   friday: true,
//   saturday: true,
//   sunday: true,
// }

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
    default:
      return state;
    case UPDATE_RESTAURANT:
      return {
        ...state, restaurants: {...state.restaurants}
      }
    case ADD_RESTAURANT:
      return {
        ...state, restaurants: {...state.restaurants}
      }
  }
}

export default restaurantReducer;
