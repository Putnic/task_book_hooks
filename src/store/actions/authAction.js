import { tasksAPI } from '../../api/api';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from './types';
import { CLEAR_MESSAGES } from './types';
import { addMessage } from './flashActions';

export const logIn = credential => dispatch => {
	dispatch({ type: CLEAR_MESSAGES });

	tasksAPI
		.login(credential)
		.then(data => {
			if (data.status === 'ok') {
				// Expire date of the token
				let timeExpire = new Date();
				timeExpire.setDate(timeExpire.getDate() + 1);

				dispatch({
					type: LOGIN_SUCCESS,
					data: {
						token: data.message.token,
						timeExpire: timeExpire.getTime()
					}
				});
				dispatch(addMessage({ type: 'success', msg: 'Login success!' }));
			} else {
				console.warn(data.message);
				dispatch({ type: LOGIN_FAIL });
				dispatch(addMessage({ type: 'danger', msg: data.message }));
			}
		})
		.catch(error => console.warn(error, error.response));
};

export const logOut = () => ({
	type: LOGOUT_SUCCESS
});
