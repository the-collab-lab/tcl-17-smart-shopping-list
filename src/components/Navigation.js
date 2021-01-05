import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [listFontWeight, setListFontWeight] = useState('normal');
  const [addFontWeight, setAddFontWeight] = useState('normal');

  const toggleBold = (event) => {
    if (event.target.className === 'list-link') {
      setListFontWeight('bold');
      setAddFontWeight('normal');
    }
    if (event.target.className === 'add-link') {
      setAddFontWeight('bold');
      setListFontWeight('normal');
    }
  };
  return (
    <nav>
      <Link
        to="/list"
        className="list-link"
        onClick={toggleBold}
        style={{ fontWeight: listFontWeight }}
      >
        {' '}
        List{' '}
      </Link>
      <Link
        to="/add-item"
        className="add-link"
        onClick={toggleBold}
        style={{ fontWeight: addFontWeight }}
      >
        {' '}
        Add an Item{' '}
      </Link>
    </nav>
  );
};

export default Navigation;
