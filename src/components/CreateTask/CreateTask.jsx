import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import s from './CreateTask.module.css';
import { createTask } from '../../store/actions/taskActions';

function CreateTask(props) {
	let { createdTask, createTask } = props;
	let [data, setData] = useState({
		username: '',
		email: '',
		text: '',
	});

	useEffect(() => {
		if (createdTask) {
			setData({ username: '', email: '', text: '' });
		}
	}, [createdTask]);

	const handleChange = (event) => {
		const target = event.target;
		if (target.checkValidity()) {
			target.classList.remove(s.invalid);
		} else {
			target.classList.add(s.invalid);
		}

		setData({ ...data, [target.name]: target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		createTask(data);
	}

	return (
		<section id='form-task' className={s.container} noValidate>
			<h2>Task create</h2>

			<form id='task' onSubmit={handleSubmit} noValidate>
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
	CreateTask
);
