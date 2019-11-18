import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import TasksList from './components/TasksList/TasksList';
import CreateEditTask from './components/CreateEditTask/CreateEditTask';

function App() {
	console.log('App.js');
	return (
		<div className='App'>
			<Header />
			<main className='container shadow'>
				<Switch>
					{/* <Route path="/" exact component={TasksList} /> */}
					<Route path='/create' component={CreateEditTask} />
					<Route path='/:page?' component={TasksList} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
