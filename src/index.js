import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './store/actions/types';

import './index.css';
import App from './App';

// Authentication on page reload
let token = localStorage.getItem('token');
let tokenExpire = Number(localStorage.getItem('tokenExpire'));

if (token && tokenExpire) {
	if (Date.now() < tokenExpire) {
		store.dispatch({
			type: LOGIN_SUCCESS,
			token,
			tokenExpire
		});
	} else {
		store.dispatch({ type: LOGOUT_SUCCESS });
	}
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
