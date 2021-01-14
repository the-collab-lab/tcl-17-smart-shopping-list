import React from 'react';
import PropTypes from 'prop-types';

const Welcome = (props) => {
  const { onClick } = props;
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={onClick}>Create a New List</button>
    </div>
  );
};

Welcome.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Welcome;
