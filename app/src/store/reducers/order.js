import { NEW_ORDER, SET_ORDER_TYPE, SET_ITEM, REMOVE_ITEM } from '../actions/order';

const initialState = {
  cart: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_ORDER:
          //this action
          return {restaurantId: action.restaurantId, cart: []};
        case SET_ORDER_TYPE:
          console.log(action)
          return {...state, type: action.type};
        case SET_ITEM:
          let newCart = state.cart.filter(cartItem => cartItem.id != action.item.id)
          newCart.push(action.item)
          return {...state, cart: newCart};
        case REMOVE_ITEM:
          let newCartRm = state.cart.filter(cartItem => cartItem.id != action.item.id)
          return {...state, cart: newCartRm};
        default:
          return state;
    }
}

export default orderReducer;