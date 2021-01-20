import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const TokenForm = () => {
  const [tokenInput, setTokenInput] = useState('');
  const history = useHistory();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const collectionRef = db.collection('userTokens');
    const tokenWeAreCheckingFor = await collectionRef
      .where('tokenName', '==', tokenInput)
      .get();
    if (tokenWeAreCheckingFor.empty) {
      console.log('no token');
      // error message
    } else {
      console.log('you found it ', tokenWeAreCheckingFor);
      localStorage.setItem('userToken', tokenInput);
      // history.push('/list')
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
      </div>
    </React.Fragment>
  );
};

export default TokenForm;
