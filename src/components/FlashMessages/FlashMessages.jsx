import React from 'react';
import { connect } from 'react-redux';
import { deleteMessage } from '../../store/actions/flashActions';

import FlashMessage from './FlashMessage';

function FlashMessages(props) {
	const { messages, deleteMessage } = props;
	return (
		<React.Fragment>
			{messages.map(msg =>
				<FlashMessage key={msg.id} message={msg} deleteMessage={deleteMessage} />
			)}
		</React.Fragment>
	);
}

function mapStateToProps(state) {
	return {
		messages: state.messages
	};
}

export default connect(mapStateToProps, {deleteMessage})(FlashMessages);
