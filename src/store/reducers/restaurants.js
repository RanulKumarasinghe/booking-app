// import { MEALS } from ../
import { RESTAURANT } from '@/other/dummy-data';

const initialState = {
  restaurants: RESTAURANT,
  filteredRestaurant: RESTAURANT
}

const restaurantReducer = (state = initialState, action) => {

  return state
}

export default restaurantReducer;