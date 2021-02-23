import React from 'react';
import { NavLink } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/list" activeClassName="active-link">
        <div className="list-link-text">List</div>
      </NavLink>
      <NavLink to="/add-item" activeClassName="active-link">
        Add Item <AddShoppingCartIcon />
      </NavLink>
    </nav>
  );
};

export default Navigation;
