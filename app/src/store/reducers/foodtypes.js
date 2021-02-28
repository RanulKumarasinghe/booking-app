import { FETCH_ALL_FOOD_TYPES, TOGGLE_FILTER_TYPE } from '@/store/actions/foodtypes'



const initialState = {
  foodType: [],
  filteredFoodType: []
}

const foodTypeReducer = (state = initialState, action) => {

  switch(action.type) {
    case TOGGLE_FILTER_TYPE:
      // Check if empty string
      if (action.foodTypeName.length == 0) {
        return {...state, filteredFoodType: state.foodType}
      } else {
        filteredFoodType = state.foodTypeName.filter(foodType => foodType.name.toLowerCase().includes(action.foodTypeName.toLowerCase()));
        return {...state, filteredFoodType: filteredFoodType}
      }
    case FETCH_ALL_FOOD_TYPES:
      return {
        ...state, foodType: action.foodType, filteredFoodType: action.foodType
      }
      default:
      return state;
  }
 }

 export default foodTypeReducer;
