import React from 'react';
// import s from './TableView.module.css';
import './TableView.module.css';
import { SORT_DIRECTION } from '../../store/actions/types';

function TableView(props) {
  // console.log(props);
  let { tasks, sort_direction, setSort } = props;

  const handleClickThead = e => {
    if (e.target.tagName === 'TH') {
      const sortField = e.target.dataset.name;
      const sortDirection = sort_direction === SORT_DIRECTION.asc
        ? SORT_DIRECTION.desc
        : SORT_DIRECTION.asc;
      // console.log(sortField, sortDirection);
      setSort(sortField, sortDirection, sort_direction, sort_direction === SORT_DIRECTION.asc);
    }
  };

  let taskItems = tasks.map(task => (
    <tr key={task.id}>
      <td>{task.username}</td>
      <td>{task.text}</td>
      <td>{task.email}</td>
      <td>{task.status}</td>
    </tr>
  ));
  
  return (
    <table>
      <thead>
        <tr onClick={handleClickThead}>
          <th data-name="username" >UserName</th>
          <th>Text</th>
          <th data-name="email" >Email</th>
          <th data-name="status" >Status</th>
        </tr>
      </thead>
      <tbody>
        {taskItems}
      </tbody>
    </table>
  );
}

export default TableView;