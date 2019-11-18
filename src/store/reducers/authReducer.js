import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', JSON.stringify(action.data));
			return {
        ...state,
				...action.data,
				isAuthenticated: true
			};
		case LOGOUT_SUCCESS:
		case LOGIN_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false
			};
		default:
			return state;
	}
}
