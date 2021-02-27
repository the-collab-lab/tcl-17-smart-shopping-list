import React, { useState } from 'react';
import { db } from '../lib/firebase';
import Error from './Error';
import './../styles/TokenForm.css';
import { Box, Button, TextField } from '@material-ui/core';

const TokenForm = ({ setToken }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = db.collection('userTokens');
    const tokenWeAreCheckingFor = await collectionRef
      .where('tokenName', '==', tokenInput)
      .get();
    if (tokenWeAreCheckingFor.empty) {
      setError(true);
    } else {
      localStorage.setItem('userToken', tokenInput);
      setError(false);
      setToken(tokenInput);
    }
  };

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        className="join-list-container"
      >
        <h3 className="join-list-header">Join an Existing List</h3>
        <form onSubmit={handleFormSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            className="join-form"
          >
            <TextField
              variant="outlined"
              id="token"
              type="text"
              label="three word token"
              name="token"
              value={tokenInput}
              onChange={(event) => {
                setTokenInput(event.target.value);
                setError(false);
              }}
              required
            />

            <Button variant="contained" id="join-button" type="submit">
              Join List
            </Button>
          </Box>
        </form>
        {error && (
          <Error errorMessage="Hmmm... we couldn't find that list. Please try again or create a new list." />
        )}
      </Box>
    </React.Fragment>
  );
};

export default TokenForm;
