import { FETCH_ALL_MENU, UPDATE_MENU } from '@/store/actions/menu'



const initialState = {
  menu: []
}

const menuReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ALL_MENU:
      return {...state, menu: action.menu}
    default:
      return state;
    case UPDATE_MENU:
      return {
        ...state, menu: {...state.menu}
      }
    case ADD_ITEM_TO_MENU:
      return {
        ...state, menu: {...state.menu}
      }
  }
}


export default menuReducer;
