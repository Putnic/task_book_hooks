import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import flashReducer from './flashReducer';
import authReducer from './authReducer';

export default combineReducers({
	task: taskReducer,
	messages: flashReducer,
	auth: authReducer
});
