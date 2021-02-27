import React from 'react';
import '../styles/Header.css';
import homeIcon from './../img/groceries.svg';

const Header = () => {
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
