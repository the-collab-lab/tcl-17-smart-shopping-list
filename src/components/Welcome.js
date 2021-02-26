import React from 'react';
import PropTypes from 'prop-types';
import TokenForm from './TokenForm';
import './../styles/Welcome.css';

const Welcome = ({ onClick, setToken }) => {
  return (
    <div className="background">
      <div className="welcome-container">
        <div className="create-list-container">
          {/* <h1>Welcome</h1> */}
          <h3 className="create-list-header">
            Get Started! <br />
            Create New List
          </h3>
          <button className="welcome-button" onClick={onClick}>
            New List
          </button>
        </div>
        <TokenForm setToken={setToken} />
      </div>
    </div>
  );
};
/* Checks that onClick is a function and is required as a prop */
Welcome.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Welcome;

//change [hidden, setHidden] to [error, setError] ? check with Rachel and Viet

// <img className="groceryAisle" src={groceryAisle} alt="grocery aisle"></img>

// style={{ backgroundImage: `url(${groceryAisle})
