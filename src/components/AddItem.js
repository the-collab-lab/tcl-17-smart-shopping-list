import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../lib/firebase';
import Error from './Error';
import Header from './Header';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from '@material-ui/core/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './../styles/AddItem.css';
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

const initialFormState = {
  itemName: '',
  cleanedUpItemName: '',
  timeFrame: 7,
  lastPurchased: null,
};

const AddItem = ({ token }) => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(false);
  const classes = useStyles();

  const handleFormChange = (event) => {
    setError(false);
    event.target.type === 'radio'
      ? setFormData({
          ...formData,
          [event.target.name]: parseInt(event.target.value),
        })
      : setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const itemNameInput = formData.itemName;

    // check to see if the itemName already exists in the user's list - convert input to lowercase and remove any punctuation & white space
    const cleanInput = itemNameInput.toLowerCase().replace(/[\W_]*|/g, '');

    // query the collection and filter for match - if match exists send the user an error message "this item already exists in your list..." & don't allow them to submit it
    const queryCollection = db.collection(token);
    const snapshot = await queryCollection
      .where('cleanedUpItemName', '==', cleanInput)
      .get();
    if (!snapshot.empty) {
      setError(true);
      return;
    }
    // else add the user's inputted item to the database
    db.collection(token).add({
      ...formData,
      cleanedUpItemName: cleanInput,
    });
    setFormData(initialFormState);
    history.push('/list');
  };

  return (
    <React.Fragment>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={500}
        height={300}
        border={3}
        borderColor="#d3d3d3"
        borderRadius="borderRadius"
      >
        <form className="form-container" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            name="itemName"
            required
            value={formData.itemName}
            onChange={handleFormChange}
            label="Add New Item"
            variant="outlined"
          />
          {error && <Error errorMessage="That item is already in your list" />}
          <FormControl component="fieldset">
            <FormLabel component="legend" hidden>
              Time Frame
            </FormLabel>
            <RadioGroup
              defaultValue="7"
              aria-label="time frame"
              name="time frame"
              onChange={handleFormChange}
            >
              <FormControlLabel
                value="7"
                control={<Radio id="soon" />}
                label="Soon"
              />
              <FormControlLabel
                value="14"
                control={<Radio id="kinda-soon" />}
                label="Kinda Soon"
              />
              <FormControlLabel
                value="30"
                control={<Radio id="not-soon" />}
                label="Not Soon"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="#d3d3d3"
            endIcon={<FontAwesomeIcon icon={faCartPlus} />}
          >
            Add Item
          </Button>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default AddItem;
