import Firebase, {db} from 'src/utils/firebase';
export const NEW_ORDER = 'NEW_ORDER';

export const newOrder = (restaurantId, bookingId) => {
  return async (dispatch) => {
    if (bookingId)
      dispatch({
        type: NEW_ORDER,
        restaurantId: restaurantId,
        bookingId: bookingId,
      });
    else dispatch({type: NEW_ORDER, restaurantId: restaurantId});
  };
};

export const SET_ORDER_TYPE = 'SET_ORDER_TYPE';

export const setOrderType = (type) => {
  return async (dispatch) => {
    dispatch({type: SET_ORDER_TYPE, orderType: type});
  };
};

export const SET_ITEM = 'SET_ITEM';

export const setItem = (item) => {
  return async (dispatch) => {
    dispatch({type: SET_ITEM, item: item});
  };
};

export const REMOVE_ITEM = 'REMOVE_ITEM';

export const remoteItem = (item) => {
  return async (dispatch) => {
    dispatch({type: REMOVE_ITEM, item: item});
  };
};

export const proccessCheckout = (data) => {
  // console.log(data.restaurantId)

  const fetchItems = (restaurantId, item) => {
    return db
      .doc(`restaurants/${restaurantId}/menu/${item.itemId}`)
      .get()
      .then((doc) => {
        return {
          item: doc.data(),
          quantity: item.quantity,
        };
      })
      .catch((err) => {
        console.log('err fetching files');
      });
  };

  const getItems = async (cart, restaurantId) => {
    return Promise.all(
      cart.map((cartItem) => fetchItems(restaurantId, cartItem))
    );
  };

  const userId = 'glJhg6e6vYS9AtXRE40Eo0DL42y1';

  getItems(data.cart, data.restaurantId)
    .then((cartItems) => {
      const bookingOrders = db.collection(`bookingOrders`);

      const order = {
        order: true,
        restaurantId: data.restaurantId,
        restaurantName: data.restaurantId,
        orderStatus: 'pending',
        userId: userId,
        createdAt: new Date(),
        cart: cartItems,
      };

      if (data.bookingId)
        bookingOrders
          .doc(data.bookingId)
          .update(order)
          .then(() => {
            console.log('Order Updated!');
          });
      else
        bookingOrders.add(order).then(() => {
          console.log('Order Added!');
        });
    })
    .catch((err) => {
      console.log('Something went wrong');
      console.log(err);
    });
};

