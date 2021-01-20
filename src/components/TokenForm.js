import React, { useState } from 'react';
import { db } from '../lib/firebase';
import Error from './Error';

const TokenForm = ({ setToken }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [hidden, setHidden] = useState(true);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = db.collection('userTokens');
    const tokenWeAreCheckingFor = await collectionRef
      .where('tokenName', '==', tokenInput)
      .get();
    if (tokenWeAreCheckingFor.empty) {
      setHidden(false);
    } else {
      localStorage.setItem('userToken', tokenInput);
      setHidden(true);
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
              }}
              required
            />
          </label>
          <button type="submit">Join an existing list</button>
        </form>
        {hidden ? (
          ''
        ) : (
          <Error errorMessage="Hmmm... we couldn't find that list. Please try again or create a new list." />
        )}
      </div>
    </React.Fragment>
  );
};

export default TokenForm;
