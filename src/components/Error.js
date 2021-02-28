import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './../styles/Theme';

const Error = ({ errorMessage }) => {
  const { blue, red, orange, salmon, yellow } = useStyles();
  return (
    <div>
      <p className={red}>
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
