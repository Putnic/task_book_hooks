import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import s from './LoginModal.module.css';

import { logIn } from '../../store/actions/authAction';

function LoginModal(props) {
	console.log('LoginModalContainer: ', props);
	const { logIn, isAuthenticated } = props;

	let [data, setData] = useState({
		username: '',
		password: ''
	});

	let [modalShow, setModalShow] = useState(false);

	const modal = useRef(null);
		
		useEffect(() => {
		console.log('LoginModalContainer useEffect: ', isAuthenticated);
		if (isAuthenticated) {
			setData({ username: '', password: '' });
			handleClose();
		}
	}, [isAuthenticated]);

	// Handle the key press event on 'esc'.
	const handleKeyUp = e => {
		const keys = {
			27: () => {
				e.preventDefault();
				handleClose();
			}
		};

		if (keys[e.keyCode]) {
			keys[e.keyCode]();
		}
	};

	// Handle the mouse click on browser window.
	const handleOutsideClick = e => {
		if (e.target === modal.current) {
			handleClose();
		}
	};

	const handleOpen = e => {
		setModalShow(true);
		window.addEventListener('keyup', handleKeyUp);
		document.addEventListener('click', handleOutsideClick);
	};

	const handleClose = e => {
		setModalShow(false);
		window.removeEventListener('keyup', handleKeyUp);
		document.removeEventListener('click', handleOutsideClick);
	};

	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('SUBMIT');
		// console.dir(e.target);
		let dataForm = new FormData(e.target);
		logIn(dataForm);
	};

	return (
		<React.Fragment>
			{/* Button to open the modal login form */}
			<button className={s.login} onClick={handleOpen}>
				Login
			</button>

			{/* The Modal */}
			{modalShow && (
				<section id='form-login_modal' className={s.modal}
					ref={modal}
					onClick={handleOutsideClick}
				>
					<form id='login'
						className={`${s.modal_content} ${s.animate}`}
						onSubmit={handleSubmit}
					>
						<h2>Login</h2>

						{/* <FlashMessages /> */}
						<span	className={s.close}	title='Close Modal'	onClick={handleClose} >
							&times;
						</span>
						<div className='s.container'>
							<label htmlFor='username'>
								<b>Username</b>
							</label>
							<input type='text' placeholder='Enter Username'
								name='username'
								onChange={handleChange}
								value={data.username}
								required
							/>

							<label htmlFor='password'>
								<b>Password</b>
							</label>
							<input type='password' placeholder='Enter Password'
								name='password'
								onChange={handleChange}
								value={data.password}
								required
							/>

							<button type='submit'>Login</button>
						</div>
					</form>
				</section>
			)}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps, { logIn })(LoginModal);
