import React from 'react';
import PropTypes from 'prop-types';
import TokenForm from './TokenForm';
import './../styles/Welcome.css';
import { Box, Button, Container } from '@material-ui/core';
import welcomeHeader from './../img/header.png';

const Welcome = ({ onClick, setToken }) => {
  return (
    <Box className="background">
      <h2>
        <img
          src={welcomeHeader}
          alt="welcome to smart shopper"
          id="welcome-header"
        ></img>
      </h2>
      <Container maxWidth="md">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          border={3}
          borderColor="lightgrey"
          borderRadius="borderRadius"
          className="welcome-box"
        >
          <Box display="flex" flexDirection="column">
            <h2 className="create-list-header">
              Get Started! <br />
              Create a New List
            </h2>
            <Button
              variant="contained"
              className="create-button"
              onClick={onClick}
            >
              Create List
            </Button>
          </Box>
          <TokenForm setToken={setToken} />
        </Box>
      </Container>
    </Box>
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
