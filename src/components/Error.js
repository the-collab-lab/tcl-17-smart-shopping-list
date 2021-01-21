import React from 'react';

const Error = ({ errorMessage }) => {
  return (
    <div>
      <p style={{ color: 'red' }}>
        <span role="img" aria-label="red X">
          ❌
        </span>{' '}
        <b>{errorMessage}</b>
      </p>
    </div>
  );
};

export default Error;
