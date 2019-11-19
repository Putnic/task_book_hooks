import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './TableView.module.css';
import { SORT_DIRECTION } from '../../store/actions/types';

function TableView(props) {
	let { tasks, sort_direction, setSort, isAuthenticated } = props;
	let {
		push,
		location: { pathname }
	} = useHistory();

	const handleClickThead = e => {
		if (e.target.tagName === 'TH') {
			const sortField = e.target.dataset.name;
			const sortDirection =
				sort_direction === SORT_DIRECTION.asc
					? SORT_DIRECTION.desc
					: SORT_DIRECTION.asc;
			setSort(
				sortField,
				sortDirection,
				sort_direction,
				sort_direction === SORT_DIRECTION.asc
			);
		}
	};

	const handleClickTR = task => {
		push(`/edit/${task.id}`, { task: { ...task }, pathname });
	};

	let taskItems = tasks.map(task => (
		<tr
		title={isAuthenticated ? 'double-click to edit task' : null}
			key={task.id}
			className={`${isAuthenticated ? s.click : null} ${
				task.status === 10 ? s.done : null
			}`}
			onDoubleClick={isAuthenticated ? () => handleClickTR(task) : null}
		>
			<td>{task.username}</td>
			<td>{task.text}</td>
			<td>{task.email}</td>
			<td>{task.status === 10 ? 'Done' : task.status}</td>
		</tr>
	));

	return (
		<table>
			<thead>
				<tr onClick={handleClickThead}>
					<th data-name='username'>UserName</th>
					<th>Text</th>
					<th data-name='email'>Email</th>
					<th data-name='status'>Status</th>
				</tr>
			</thead>
			<tbody>{taskItems}</tbody>
		</table>
	);
}

export default TableView;
