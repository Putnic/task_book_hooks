import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import { LOGIN_SUCCESS } from './store/actions/types';

import './index.css';
import App from './App';

console.log('Index.js');
// Authentication on page reload
if (localStorage.getItem('token')) {
	let dataStorage = JSON.parse(localStorage.getItem('token'));
  console.log('index.js', Date.now() < dataStorage.timeExpire);
  console.log(dataStorage);
	// store.dispatch(loadUser());
	store.dispatch({
		type: LOGIN_SUCCESS,
		...dataStorage
	});
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
