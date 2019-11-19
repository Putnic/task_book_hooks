import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
	token: null,
	isAuthenticated: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.token);
			localStorage.setItem('tokenExpire', action.tokenExpire);
			return {
				...state,
				token: action.token,
				isAuthenticated:
					Date.now() < Number(localStorage.getItem('tokenExpire'))
			};
		case LOGOUT_SUCCESS:
		case LOGIN_FAIL:
			localStorage.removeItem('token');
			localStorage.removeItem('tokenExpire');
			return {
				...state,
				token: null,
				isAuthenticated: false
			};
		default:
			return state;
	}
}
