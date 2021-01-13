import { LOGIN, SIGNUP, LOGOUT } from '../actions/auth';

// const initialState = {
//   token: null,
//   userId: null,
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case AUTHENTICATE:
//       return {
//         token: action.token,
//         userId: action.userId,
//       };
//     case LOGOUT:
//       return {
//         ...initialState,
//       };
//     // case SIGNUP:
//     //   return {
//     //     token: action.token,
//     //     userId: action.userId
//     //   };
//     default:
//       return state;
//   }
// };


const user = (state = {}, action) => {
	switch (action.type) {
		case LOGIN:
			return action.payload
		case SIGNUP:
			return action.payload
		default:
			return state
	}
}

export default user;