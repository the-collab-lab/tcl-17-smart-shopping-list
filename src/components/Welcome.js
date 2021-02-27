import React from 'react';
import PropTypes from 'prop-types';
import TokenForm from './TokenForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  blue: {
    color: theme.palette.blue.main,
  },
  red: {
    color: theme.palette.red.main,
  },
  orange: {
    color: theme.palette.orange.main,
  },
  salmon: {
    color: theme.palette.salmon.main,
  },
  yellow: {
    color: theme.palette.yellow.main,
  },
}));

const Welcome = ({ onClick, setToken }) => {
  const classes = useStyles();

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={onClick}>Create a New List</button>
      <TokenForm setToken={setToken} />
    </div>
  );
};
/* Checks that onClick is a function and is required as a prop */
Welcome.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Welcome;
