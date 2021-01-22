import React from 'react';
import PropTypes from 'prop-types';
import TokenForm from './TokenForm';

const Welcome = ({ onClick, setToken }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={onClick}>Create a New List</button>
      <TokenForm setToken={setToken} />
    </div>
  );
};
/* Checks that onClick is a function and is required as a prop */
Welcome.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Welcome;

//change [hidden, setHidden] to [error, setError] ? check with Rachel and Viet
