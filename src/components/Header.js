import React from 'react';
import '../styles/Header.css';
import homeIcon from './../img/groceries.svg';
import { useStyles } from './../styles/Theme';

const Header = () => {
  const { blue, red, orange, salmon, yellow } = useStyles();
  return (
    <header>
      <img
        src={homeIcon}
        className="homeIcon"
        alt="colorful grocery bag logo and home link"
      />
      <h1>Smart Shopper</h1>
    </header>
  );
};

export default Header;
