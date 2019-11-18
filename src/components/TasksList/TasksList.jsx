import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTasks, setSort } from '../../store/actions/taskActions';
import s from './TasksList.module.css';

import Paginator from '../Paginator/Paginator';
import TableView from '../TableView/TableView';

function TasksList(props) {
  let { tasks, task_count, match: { params: { page = 1 } } } = props;
  let { sorting: {sort_field, sort_direction} } = props
  let { getTasks, setSort } = props;
  console.log('TasksList.jsx task_count: ', task_count, '\nProps: ', props);

  useEffect(() => {
    console.log('TasksList useEffect - 2'.toLocaleUpperCase());
    // (currentPage, sortField, sortDirection)
    getTasks(page, sort_field, sort_direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, sort_field, sort_direction]);

  return (
    <section id="tasks" className={s.tasks}>
      <h2>Tasks list</h2>
      <Paginator itemsCount={task_count} pageSize={3} currentPage={parseInt(page)} />
      <TableView tasks={tasks} setSort={setSort} sort_direction={sort_direction}/>
    </section>
  );
}

const mapStateToProps = state => {
  // console.log({...state.task});
  // console.log('TTTT: ', tasks, task_count);
  const { tasks, total_task_count: task_count, sorting } = { ...state.task };
	// const filterTasks = getFilteredTasks(tasks, filter);
	// const sortTasks = getSortTasks(filterTasks, sorting);
	return {
    tasks,
    task_count,
    sorting
	};
};

export default connect(mapStateToProps, { getTasks, setSort })(TasksList);