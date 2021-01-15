import { LOGIN, SIGNUP, LOGOUT } from '../actions/auth';

const user = (state = {}, action) => {
	switch (action.type) {
		case LOGIN:
			return action.payload
		case SIGNUP:
      return action.payload
    case LOGOUT:
      return {}
		default:
			return state
	}
}

export default user;