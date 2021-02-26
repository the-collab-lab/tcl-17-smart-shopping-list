import React, { useState } from 'react';
import { db } from '../lib/firebase';
import Error from './Error';
import './../styles/TokenForm.css';

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
      <div className="join-list-container">
        <h3 className="join-list-header">Join Existing List</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="join-form">
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
            <button className="welcome-button" type="submit">
              Join
            </button>
          </div>
        </form>
        {error && (
          <Error errorMessage="Hmmm... we couldn't find that list. Please try again or create a new list." />
        )}
      </div>
    </React.Fragment>
  );
};

export default TokenForm;
