import { ADD_MESSAGE, DELETE_MESSAGE } from './types';

// Add message
export const addMessage = message => {
	return {
		type: ADD_MESSAGE,
		message
	};
};

// Delete message
export const deleteMessage = id => {
	return {
		type: DELETE_MESSAGE,
		id
	};
};
