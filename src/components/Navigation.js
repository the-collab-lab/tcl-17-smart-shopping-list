import React from 'react';
import { NavLink } from 'react-router-dom';
import homeIcon from './../img/groceries.svg';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" activeClassName="active-link">
        <div className="textWithIcon">
          <span>Home</span>{' '}
          <img className="homeIcon" src={homeIcon} alt="logo and home link" />
        </div>
      </NavLink>
      <NavLink to="/list" activeClassName="active-link">
        <div className="textWithIcon">
          <span>Shopping List</span> <i class="fas fa-list-ul"></i>
        </div>
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

// MUST ADD CREDIT SOMEWHERE <div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
