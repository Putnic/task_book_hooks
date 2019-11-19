import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Header.module.css';

import LoginModal from '../LoginModal/LoginModal';

function Header() {
  return (
    <header className="shadow">
      <div className={`container ${s.header}`}>
        <Link to="/" className={s.logo}>Task_Book</Link>
        <nav>
          <NavLink activeClassName={s.active} exact to="/">Home</NavLink>
          <NavLink activeClassName={s.active} to="/create">AddTask</NavLink>
          <LoginModal />
        </nav>
      </div>
    </header>
  );
}

export default Header;