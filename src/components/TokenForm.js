import React, { useState } from 'react';

const TokenForm = () => {
  const [tokenInput, setTokenInput] = useState('');
  return (
    <React.Fragment>
      <div>
        <h3>Share Token</h3>
        <form onSubmit={console.log(tokenInput)}>
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
