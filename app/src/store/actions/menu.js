import firebase from 'src/utils/firebase'


export const FETCH_ALL_MENU = 'FETCH_ALL_MENU';

export const fetchAllMenu = (restaurant) => {
  return async dispatch => {
    firebase.firestore().collection('restaurants').doc(restaurant.id).collection('menu').orderBy('numType').get()
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
    firebase.firestore().collection('restaurants').doc(saveMenu.rId).collection('menu').doc(saveMenu.id).update({
      name: saveMenu.name,
      price: saveMenu.price,
      imageUrl: saveMenu.imageUrl,
      description: saveMenu.description,
      numType: saveMenu.numType,
      type: saveMenu.type
    }).then(() => {
      dispatch({ type: UPDATE_MENU, menu: saveMenu })
      console.log('Item updated!');
    }).catch(e => {
      console.log(e)
    })
  }
}

export const ADD_ITEM_TO_MENU = 'ADD_ITEM_TO_MENU';

export const createItem = (addItem) => {
  return dispatch => {
    firebase.firestore().collection('restaurants').doc(addItem.rId).collection('menu').add({
      name: addItem.name,
      price: addItem.price,
      imageUrl: addItem.imageUrl,
      description: addItem.description,
      numType: addItem.numType,
      type: addItem.type
    }).then(() => {
      dispatch({ type: ADD_ITEM_TO_MENU, menu: addItem })
      console.log('Item Added!');
    }).catch(e => {
      console.log(e)
    })
  }
}

export const DELETE_ITEM_FROM_MENU = 'DELETE_ITEM_FROM_MENU';

export const deleteItem = (delItem) => {
  console.log(delItem)
  return dispatch => {
    firebase.firestore().collection('restaurants').doc(delItem.rId).collection('menu').doc(delItem.id).delete().then(() => {
      dispatch({ type: DELETE_ITEM_FROM_MENU, menu: delItem })
    }).catch(e => {
      console.log(e)
    })
  }
}

