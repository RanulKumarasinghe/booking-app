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
			alert(e)
		}
  }
}

export const isManager = uid => {
	return async (dispatch) => {
		// try {
      // const restaurant = await 
      db.collection('restaurants')
        .where("staffIds", "array-contains", {id: uid})
				.get().then(e => {
          console.log(e)
        }).catch(e=> {
          console.log(e)
        })


		// 	// dispatch({ type: LOGIN, payload: user.data() })
		// } catch (e) {
		// 	alert(e)
		// }
	}
}

export const getUser = uid => {
	return async (dispatch) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

      // db.collection('users').where("staffId", "array-contains", {name: "John Travolta"})

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

      // db.collection('restaurants')
      // .where("staffIds", "array-contains", {id: response.user.uid})
      // .get().then(e => {
      //   console.log(e)
      // }).catch(e=> {
      //   console.log(e)
      // })

      dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const logout = () => {
  return async (dispatch) => {
    Firebase.auth().signOut().then(() => {
      dispatch({ type: LOGOUT });
    }).catch((error) => {
      alert(error)
    });
  }
  // AsyncStorage.removeItem('userData');
};

