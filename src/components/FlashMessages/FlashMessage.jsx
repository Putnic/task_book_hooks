import React from 'react';
import s from './FlashMessage.module.css';

function FlashMessage(props) {
	// type: danger, success, info, warning
	let { id, type, msg } = props.message;
	let body = null;
	console.log('FlashMessage', props);

	const flashID = setTimeout(() => {
		props.deleteMessage(id);
	}, 5000);

	const handleClick = () => {
		console.log('flashID', flashID);
		props.deleteMessage(id);
		clearTimeout(flashID);
	};

	if (typeof msg === 'object') {
		body = Object.keys(msg).map((field, i) => {
			return (
				<p key={i}>
					{field}: {msg[field]}
				</p>
			);
		});
	} else {
		body = <p> {msg}</p>;
	}

	return (
		<div className={s[type]}>
			<span className={s.closebtn} onClick={handleClick}>
				&times;
			</span>
			<p>
				<strong>{type}!</strong>
			</p>
			{body}
		</div>
	);
}

export default FlashMessage;
