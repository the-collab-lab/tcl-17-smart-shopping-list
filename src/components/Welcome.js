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

// When the user does not already have a token in localStorage, on the onboarding/home screen, a simple form is displayed that allows the user to enter a token

// Entering the token and hitting submit saves the token to localStorage, effectively giving them joint control of the list
// On submit, show an error if the token does not exist
// If they get an error message, allow them to try again or create a new list
