import React from 'react';
import { NavLink } from 'react-router-dom';
import homeIcon from './../img/groceries.svg';
import './../styles/Navigation.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  blue: {
    color: theme.palette.blue.main,
  },
  red: {
    color: theme.palette.red.main,
  },
  orange: {
    color: theme.palette.orange.main,
  },
  salmon: {
    color: theme.palette.salmon.main,
  },
  yellow: {
    color: theme.palette.yellow.main,
  },
}));

const Navigation = ({ confirmDeleteUserToken }) => {
  const { blue, red, orange, salmon, yellow } = useStyles();

  return (
    <nav>
      <NavLink
        exact
        to="/"
        activeClassName="active-link"
        onClick={confirmDeleteUserToken}
      >
        <img className="homeIcon" src={homeIcon} alt="logo and home link" />
        <span className="home-link-text">Home</span>
      </NavLink>
      <NavLink to="/list" activeClassName="active-link">
        <i className="fas fa-list-ul fa-2x"></i>
        <span>Shopping List</span>
      </NavLink>
      <NavLink to="/add-item" activeClassName="active-link">
        <i className="fas fa-cart-plus fa-2x"></i>
        <span>Add Item</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;

// MUST ADD CREDIT SOMEWHERE <div>Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
