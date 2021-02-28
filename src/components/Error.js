import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './../styles/Theme';

const Error = ({ errorMessage }) => {
  const classes = useStyles();
  return (
    <div>
      <p className={classes.red}>
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
