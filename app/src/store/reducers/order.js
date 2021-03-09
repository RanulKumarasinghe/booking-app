import { NEW_ORDER, SET_ORDER_TYPE, SET_ITEM, REMOVE_ITEM } from '../actions/order';

const initialState = {
  cart: [],
  nextItem: 1,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_ORDER:
          //this action
          return {...initialState, orderRestaurantId: action.restaurantId, cart: []};
        case SET_ORDER_TYPE:
          console.log(action)
          return {...state, type: action.type};
        case SET_ITEM:
          //Get cart without the item about to be added.
          let newCart = state.cart.filter(cartItem => cartItem.item.id != action.item.id)
          //Add  id if not present
          if (action.item.id) {
            newCart.push(action.item)
            return {...state, cart: newCart};
          } else {
            newCart.push({id: state.nextItem, ...action.item})
            return {...state, cart: newCart, nextItem: state.nextItem+1};
          }
        case REMOVE_ITEM:
          let newCartRm = state.cart.filter(cartItem => cartItem.item.id != action.item.id)
          return {...state, cart: newCartRm};
        default:
          return state;
    }
}

export default orderReducer;