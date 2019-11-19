import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/Header/Header';
import FlashMessages from './components/FlashMessages/FlashMessages';
import TasksList from './components/TasksList/TasksList';
import CreateTask from './components/CreateTask/CreateTask';
import CreateEditTask from './components/CreateEditTask/CreateEditTask';

function App(props) {
	let { isAuthenticated } = props;
	return (
		<div className='App'>
			<Header />
			<FlashMessages />
			<main className='container shadow'>
				<Switch>
					<Route path='/' exact component={TasksList} />
					<Route path='/page/:page' component={TasksList} />
					<Route path='/create' component={CreateTask} />
					<Route
						path='/edit/:id'
						render={(props) => isAuthenticated
							? (<CreateEditTask {...props} />)
							: (	<Redirect to='/' />	)
						}
					/>
					<Redirect path="*" to='/' />
				</Switch>
			</main>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps, null)(App);
