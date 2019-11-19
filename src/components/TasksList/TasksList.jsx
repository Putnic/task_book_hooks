import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import s from './TasksList.module.css';

import { getTasks, setSort } from '../../store/actions/taskActions';
import Paginator from '../Paginator/Paginator';
import TableView from '../TableView/TableView';

function TasksList(props) {
  let { isAuthenticated, tasks, task_count, loadedTask } = props;
  let { sorting: { sort_field, sort_direction } } = props;
  let { match: { params: { page = 1 } } } = props;
  let { getTasks, setSort } = props;

  useEffect(() => {
    getTasks(page, sort_field, sort_direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, sort_field, sort_direction]);

  return (
    <section id="tasks" className={s.tasks}>
      <h2>Tasks list</h2>
      {loadedTask ? <h3>Task is loading</h3> : null}
      <Paginator itemsCount={task_count} pageSize={3} currentPage={parseInt(page)} />
      <TableView tasks={tasks}
        setSort={setSort}
        sort_direction={sort_direction}
        isAuthenticated={isAuthenticated} />
    </section>
  );
}

const mapStateToProps = state => {
  const { tasks, total_task_count: task_count, sorting, loadedTask } = { ...state.task };
	return {
    tasks,
    task_count,
    sorting,
    loadedTask,
    isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps, { getTasks, setSort })(TasksList);