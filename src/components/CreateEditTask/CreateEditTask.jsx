import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import s from './CreateEditTask.module.css';

import { editTask } from '../../store/actions/taskActions';
import { logOut } from '../../store/actions/authAction';
import { addMessage } from '../../store/actions/flashActions';

function CreateEditTask(props) {
	let { editedTask, isAuthenticated, editTask, logOut, addMessage } = props;
	let {
		location: {
			state: { task, pathname }
		}
	} = props;
	let { history } = props;

	let prevText = task.text.replace(' (edited by admin)', '');
	let [data, setData] = useState({ ...task, text: prevText });

	useEffect(() => {
		if (editedTask) {
			history.push(pathname);
		}
		// eslint-disable-next-line
	}, [editedTask]);

	const handleChange = event => {
		const target = event.target;
		if (target.checkValidity()) {
			target.classList.remove(s.invalid);
		} else {
			target.classList.add(s.invalid);
		}

		setData({ ...data, [target.name]: target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		let token = localStorage.getItem('token');
		let tokenExpire = Number(localStorage.getItem('tokenExpire'));
		if (token && tokenExpire) {
			if (Date.now() < tokenExpire) {
				data.text =
					prevText === data.text ? data.text : `${data.text} (edited by admin)`;
				editTask(token, data);
			} else {
				addMessage({ type: 'warning', msg: 'For edit you need to log in' });
				logOut();
			}
		} else {
			addMessage({ type: 'warning', msg: 'For edit you need to log in' });
			logOut();
		}
	};

	return (
		<section id='form-task' className={s.container}>
			<h2>Task edit</h2>

			<form id='task' onSubmit={handleSubmit}>
				<label htmlFor='uname'>User Name</label>
				<input
					id='uname'
					placeholder='Your name..'
					readOnly={isAuthenticated}
					type='text'
					name='username'
					value={data.username}
					onChange={handleChange}
					required
				/>

				<label htmlFor='email'>Email</label>
				<input
					id='email'
					placeholder='Your email.. (name@site.com)'
					readOnly={isAuthenticated}
					name='email'
					value={data.email}
					onChange={handleChange}
					pattern='(-|\w)+@(-|\w)+\.\w+'
					required
				/>

				{isAuthenticated && (
					<label htmlFor='status'>
						Status
						<select
							id='status'
							name='status'
							value={data.status}
							onChange={handleChange}
						>
							{Array.from({ length: 11 }, (v, i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
						</select>
					</label>
				)}

				<label htmlFor='text'>Text</label>
				<textarea
					id='text'
					placeholder='Write something..'
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
		editedTask: state.task.editedTask,
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps, { editTask, logOut, addMessage })(
	CreateEditTask
);
