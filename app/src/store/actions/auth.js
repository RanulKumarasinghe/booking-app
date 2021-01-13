import { AsyncStorage } from 'react-native';
import Firebase, { db } from '@/utils/firebase'

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';

// const db = Firebase.firestore()

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const signUp = (name, email, password) => {
	return async (dispatch) => {
    try {
      const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
			if (response.user.uid) {
				const user = {
          uid: response.user.uid,
          name: name,
					email: email
        }

				db.collection('users')
					.doc(response.user.uid)
					.set(user)
				dispatch({ type: SIGNUP, payload: user })
			}
		} catch (e) {
      console.log('Fuck')
			alert(e)
		}
  }
}

export const getUser = uid => {
	return async (dispatch) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch({ type: LOGIN, payload: user.data() })
		} catch (e) {
			alert(e)
		}
	}
}

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await Firebase.auth().signInWithEmailAndPassword(email, password)

			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const logout = () => {
  clearLogoutTimer();
  // AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

