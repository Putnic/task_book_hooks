import { ADD_MESSAGE, DELETE_MESSAGE, CLEAR_MESSAGES } from '../actions/types';

const initialState = [];
let _id = 1;
export default function(state = initialState, action = {}) {
	switch (action.type) {
		case ADD_MESSAGE:
			console.log('_id = ', _id);
			return [
				...state,
				{
				id: _id++,
				type: action.message.type,
				msg: action.message.msg,
				}
			];
		case DELETE_MESSAGE:
      return state.filter(msg => msg.id !== action.id);
		case CLEAR_MESSAGES:
			return [];
		default:
			return state;
	}
}
