import firebase from 'src/utils/firebase'


export const FETCH_ALL_MENU = 'FETCH_ALL_MENU';

export const fetchAllMenu = (restaurantId) => {
  return async dispatch => {
    const menu = await firebase.firestore().collection('restaurants').doc(restaurantId).collection('menu')
    menu.get().then((querySnapshot) => {
      const menuArray = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: FETCH_ALL_MENU, menu: menuArray})
    })
  }
};

export const UPDATE_MENU = 'UPDATE_MENU';

export const updateRestaurant = (saveRestaurant, saveMenu) => {
  return dispatch => {
    const menu = firebase.firestore().collection('restaurants').doc(saveRestaurant.id).collection('menu').doc(saveMenu.id)
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
