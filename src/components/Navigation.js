import React from 'react';
import { NavLink } from 'react-router-dom';
import homeIcon from './../img/groceries.svg';
import './../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" activeClassName="active-link">
        <img className="homeIcon" src={homeIcon} alt="logo and home link" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/list" activeClassName="active-link">
        <i class="fas fa-list-ul"></i>
        <span>Shopping List</span>
      </NavLink>
      <NavLink to="/add-item" activeClassName="active-link">
        <i class="fas fa-cart-plus"></i>
        <span>Add Item</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;

// MUST ADD CREDIT SOMEWHERE <div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
