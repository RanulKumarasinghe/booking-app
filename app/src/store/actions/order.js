import Firebase from 'src/utils/firebase';
export const NEW_ORDER = 'NEW_ORDER';

export const newOrder = (restaurantId) => {
    return async dispatch => {
      dispatch({ type: NEW_ORDER, restaurantId: restaurantId})
    } 
};

export const SET_ORDER_TYPE = 'SET_ORDER_TYPE';

export const setOrderType = (type) =>{
  return async dispatch => {
    dispatch({ type: SET_ORDER_TYPE, orderType: type})
  } 
};

export const SET_ITEM = 'SET_ITEM';

export const setItem = (item) =>{
  return async dispatch => {
    dispatch({ type: SET_ITEM, item: item })
  } 
};


export const REMOVE_ITEM = 'REMOVE_ITEM';

export const remoteItem = (item) =>{
  return async dispatch => {
    dispatch({ type: REMOVE_ITEM, item: item })
  } 
};


