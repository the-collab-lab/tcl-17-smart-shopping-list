import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/list" activeClassName="active-link">
        <div className="list-link-text">List</div>
      </NavLink>
      <NavLink to="/add-item" activeClassName="active-link">
        <span>
          Add Item <i class="fas fa-cart-plus"></i>
        </span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
