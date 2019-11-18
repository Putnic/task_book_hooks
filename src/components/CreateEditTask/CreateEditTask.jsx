import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import s from './CreateEditTask.module.css';
import { createTask } from '../../store/actions/taskActions';

import FlashMessages from '../FlashMessages/FlashMessages';

function CreateEditTask(props) {
	let { createdTask, createTask } = props;
	let [data, setData] = useState({
		username: '',
		email: '',
		text: ''
		// status: 0
	});
	console.log(`CreateEditTask.jsx`);
	useEffect(() => {
		console.log('useEffect createdTask: ', createdTask);
		if (createdTask) {
			setData({ username: '', email: '', text: '' });
		}
	}, [createdTask]);

	const handleChange = (event) => {
		const target = event.target;
		console.log(target.checkValidity(), target.validationMessage);
		if (target.checkValidity()) {
			target.classList.remove(s.invalid);
		} else {
			console.warn('Invalid');
			target.classList.add(s.invalid);
		}

		setData({ ...data, [target.name]: target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault(); console.log('SUBMIT', e.target);
		let dataForm = new FormData(e.target);
		createTask(dataForm);
	}

	// let statusOption = Array.from({ length: 10 }, (v, i) => (
	//   <option key={i} value={i}>
	//     {i}
	//   </option>
	// ));

	return (
		<section id='form-task' className={s.container}>
			<h2>Task</h2>

			<FlashMessages />
			<form id='task' onSubmit={handleSubmit} >
				<label htmlFor='uname'>User Name</label>
				<input id='uname' placeholder='Your name..'
					type='text'
					name='username'
					value={data.username}
					onChange={handleChange}
					required
				/>

				<label htmlFor='email'>Email</label>
				<input id="email" placeholder="Your email.. (name@site.com)"
					name="email"
					value={data.email}
					onChange={handleChange}
					pattern="(-|\w)+@(-|\w)+\.\w+"
					required
				/>

				{/* <label htmlFor="status">Status</label>
        <select id="status" name="status" value={data.status} onChange={handleChange}>
          {statusOption}
        </select> */}

				<label htmlFor='text'>Text</label>
				<textarea id='text' placeholder='Write something..'
					name='text'
					value={data.text}
					onChange={handleChange}
					required
				></textarea>

				<input type='submit' value='Save' />
			</form>
		</section>
	);
}

const mapStateToProps = state => {
	return {
		createdTask: state.task.createdTask,
	};
};

export default connect(mapStateToProps, { createTask })(
	CreateEditTask
);
