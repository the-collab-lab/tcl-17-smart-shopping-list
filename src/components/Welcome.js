import React from 'react';
import PropTypes from 'prop-types';

const Welcome = ({ onClick }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={onClick}>Create a New List</button>
    </div>
  );
};
/* Checks that onClick is a function and is required as a prop */
Welcome.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Welcome;
