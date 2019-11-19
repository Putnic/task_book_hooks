import {
	GET_TASKS,
	TASKS_LOADING,
	CREATE_TASK,
	TASK_CREATING,
	EDIT_TASK,
	TASK_EDITING,
	SET_SORTING,
	CLEAR_MESSAGES
} from './types';
import { tasksAPI } from '../../api/api';
import { addMessage } from './flashActions';

// TASK ACTIONS
// Get Tasks
export const getTasks = (
	currentPage = 1,
	sortField = '',
	sortDirection = ''
) => (dispatch, getState) => {
	// dispatch({ type: CLEAR_MESSAGES });
	dispatch({ type: TASKS_LOADING });

	tasksAPI
		.getTasks(currentPage, sortField, sortDirection)
		.then(data => {
			if (data.status === 'ok') {
				dispatch({
					type: GET_TASKS,
					tasks: data.message.tasks,
					total_task_count: data.message.total_task_count
				});
			} else {
				console.warn(data.message);
				dispatch(addMessage({ type: 'danger', msg: data.message }));
			}
		})
		.catch(error => console.warn(error, error.response));
};

// Tasks is loading and loaded
export const setTasksLoading = () => {
	return {
		type: TASKS_LOADING
	};
};

// Create Task
export const createTask = task => (dispatch, getState) => {
	// dispatch({ type: CLEAR_MESSAGES });
	dispatch({ type: TASK_CREATING });

	tasksAPI
		.addTask(task)
		.then(data => {
			if (data.status === 'ok') {
				dispatch({
					type: CREATE_TASK,
					task: data.message
				});
				dispatch(
					addMessage({ type: 'success', msg: 'Task was created successfully' })
				);
				dispatch({ type: TASK_CREATING });
			} else {
				console.warn(data.message);
				dispatch(addMessage({ type: 'danger', msg: data.message }));
			}
		})
		.catch(error => console.warn(error, error.response));
};

// Edit Task
export const editTask = (token, task) => (dispatch, getState) => {
	// dispatch({ type: CLEAR_MESSAGES });
	dispatch({ type: TASK_EDITING });

	tasksAPI
		.editTask(task.id, {...task, token})
		.then(data => {
			if (data.status === 'ok') {
				dispatch({
					type: EDIT_TASK,
					task,
					id: task.id
				});
				dispatch(
					addMessage({ type: 'success', msg: 'Task was updated successfully' })
				);
				dispatch({ type: TASK_EDITING });
			} else {
				console.warn(data.message);
				dispatch(addMessage({ type: 'danger', msg: data.message }));
			}
		})
		.catch(error => console.warn(error, error.response));
};

// Sorting Task
export const setSort = (sort_field, sort_direction) => ({
	type: SET_SORTING,
	sort_field,
	sort_direction
});
