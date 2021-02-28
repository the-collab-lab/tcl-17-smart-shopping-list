import React, { useState } from 'react';
import { db } from '../lib/firebase';
import Error from './Error';
import { useStyles } from './../styles/Theme';

const TokenForm = ({ setToken }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState(false);
  const { blue, red, orange, salmon, yellow } = useStyles();

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
      <div>
        <h3>Share Token</h3>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="token">
            <input
              id="token"
              type="text"
              placeholder="three word token"
              name="token"
              value={tokenInput}
              onChange={(event) => {
                setTokenInput(event.target.value);
                setError(false);
              }}
              required
            />
          </label>
          <button type="submit">Join an existing list</button>
        </form>
        {error && (
          <Error errorMessage="Hmmm... we couldn't find that list. Please try again or create a new list." />
        )}
      </div>
    </React.Fragment>
  );
};

export default TokenForm;
