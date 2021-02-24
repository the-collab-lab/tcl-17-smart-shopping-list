import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ confirmDeleteUserToken }) => {
  return (
    <nav>
      <NavLink to="/" activeClassName="active-link">
        <div className="home-link-text" onClick={confirmDeleteUserToken}>
          Home
        </div>
      </NavLink>
      <NavLink to="/list" activeClassName="active-link">
        <div className="list-link-text">List</div>
      </NavLink>
      <NavLink to="/add-item" activeClassName="active-link">
        Add Item
      </NavLink>
    </nav>
  );
};

export default Navigation;
