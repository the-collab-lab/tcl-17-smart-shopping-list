import React from 'react';
import PropTypes from 'prop-types';

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

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default Error;
