import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TokenForm from './TokenForm';
import './../styles/Welcome.css';
import { Box, Button, Container } from '@material-ui/core';
import welcomeHeader from './../img/header.png';

const Welcome = ({ onClick, setToken }) => {
  /** Using this alert instead of the ArchivalNoticeModal due to legacy deps */
  useEffect(() => {
    alert(
      'This Smart Shopping List App was made by early-career developers at The Collab Lab. This project has now been archived. To view the demo shopping list, enter the three word token: the collab lab. The following features are no longer supported: creating new lists, adding & deleting items from the list, and marking items on the list as purchased.',
    );
  }, []);

  return (
    <Box className="background">
      <h2>
        <img
          src={welcomeHeader}
          alt="welcome to smart shopper"
          id="welcome-header"
        />
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
          <Box display="flex" flexDirection="column" className="create-list">
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
