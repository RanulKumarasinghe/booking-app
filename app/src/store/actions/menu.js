import firebase from 'src/utils/firebase'


export const FETCH_ALL_MENU = 'FETCH_ALL_MENU';

export const fetchAllMenu = (restaurant) => {
  return async dispatch => {
    firebase.firestore().collection('restaurants').doc(restaurant.id).collection('menu').get()
    .then((querySnapshot) => {
      const menuArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })

      dispatch({ type: FETCH_ALL_MENU, menu: menuArray})
    }).catch(e=> {
    alert(e)
  })
  }
};

export const UPDATE_MENU = 'UPDATE_MENU';

export const updateMenu = (saveMenu) => {
  return dispatch => {
    const menu = firebase.firestore().collection('restaurants').doc(saveMenu.rId).collection('menu').doc(saveMenu.id)
    menu.update({
      name: saveMenu.name,
      price: saveMenu.price,
      picture: saveMenu.picture,
      description: saveMenu.description
    }).then(() => {
      console.log('User updated!');
    })
    dispatch({ type: UPDATE_MENU, menu: saveMenu })
  }
}

export const ADD_ITEM_TO_MENU = 'ADD_ITEM_TO_MENU';

export const createItem = (addItem) => {
  return dispatch => {
    const menu = firebase.firestore().collection('restaurants').doc(addItem.rId).collection('menu')
    menu.add({
      name: addItem.name,
      price: addItem.price,
      picture: addItem.picture,
      description: addItem.description
    }).then(() => {
      console.log('User updated!');
    })
    dispatch({ type: ADD_ITEM_TO_MENU, menu: createItem })
  }
}

export const DELETE_ITEM_FROM_MENU = 'DELETE_ITEM_FROM_MENU';

export const deleteItem = (delItem) => {
  return dispatch => {
    firebase.firestore().collection('restaurants').doc(delItem.rId).collection('menu').doc(delItem.id).remove()
    dispatch({ type: DELETE_ITEM_FROM_MENU, menu: deleteItem })
  }
}
