import { FETCH_ALL_MENU, UPDATE_MENU, ADD_ITEM_TO_MENU, DELETE_ITEM_FROM_MENU } from '@/store/actions/menu'



const initialState = {
  menu: []
}

const menuReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ALL_MENU:
      return {...state, menu: action.menu}
    case UPDATE_MENU:
      let newMenuItem = state.menu.filter(menu => menu.id != action.menu.id)
      newMenuItem.push(action.menu)
      return {
        ...state, menu: newMenuItem
      }
    case ADD_ITEM_TO_MENU:
      let newItem = state.menu.filter(menu => menu.id != action.menu.id)
      newItem.push(action.menu)
      return {
        ...state, menu: newItem
      }
      default:
        return state;
    case DELETE_ITEM_FROM_MENU:
      return {
        ...state, menu: action.menu
      }
  }
}


export default menuReducer;
