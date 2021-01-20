import React from 'react';

const Error = ({ errorMessage }) => {
  return (
    <div>
      <p style={{ color: 'red' }}>
        ❌ <b>{errorMessage}</b>
      </p>
    </div>
  );
};

export default Error;
