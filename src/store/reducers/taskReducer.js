import {
	GET_TASKS,
	TASKS_LOADING,
	CREATE_TASK,
	TASK_CREATING,
	EDIT_TASK,
	SET_SORTING,
} from '../actions/types';

const initialState = {
	tasks: [],
	total_task_count: 0,
  loadedTasks: false,
	createdTask: false,
	sorting: {
		sort_field: null,
		sort_direction: null
	}
};

export default function(state = initialState, action = {}) {
	switch (action.type) {
		case GET_TASKS:
			return {
				...state,
				tasks: action.tasks,
				total_task_count: action.total_task_count,
				loadedTasks: true
			};
		case TASKS_LOADING:
			return {
				...state,
				loadedTasks: false
			};
		case CREATE_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.task],
				createdTask: true
			};
		case TASK_CREATING:
			return {
				...state,
				createdTask: false
			};
		case EDIT_TASK:
			return {
				...state,
				tasks: [...state.tasks].map(task =>
					task._id === action.payload._id ? action.payload : task
				)
			};
		case SET_SORTING:
			return {
				...state,
				sorting: {
					sort_field: action.sort_field,
					sort_direction: action.sort_direction
				}
      };
		default:
			return state;
	}
}
