import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signUp = (email, password) => {
  return dispatch(firebase.auth().createUserWithEmailAndPassword(email, password))
  .then((response) => {
    const uid = response.user.uid
    const data = {
        id: uid,
        email,
        fullName,
    };
    const usersRef = firebase.firestore().collection('users')

    usersRef.doc(uid).set(data)
      .then(() => {
        dispatch(
          authenticate(
            email,
            123,
            100000
          )
        );
      })
      .catch((error) => {
          alert(error)
      });
    })
    .catch((error) => {
        alert(error)
    });
}

export const login = (email, password) => {
  return async dispatch => {
    //placeholder for http request
    // await timeout(1000);


    dispatch(
      authenticate(
        email,
        123,
        100000
      )
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  // AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

