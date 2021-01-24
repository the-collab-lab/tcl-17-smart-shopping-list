import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../lib/firebase';
import Error from './Error';

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
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <h2>Add your item</h2>
        <label>
          Item Name
          <input
            type="text"
            placeholder="add your item here"
            name="itemName"
            required
            value={formData.itemName}
            onChange={handleFormChange}
          />
          {error && <Error errorMessage="That item is already in your list" />}
        </label>

        <fieldset className="fieldset">
          <legend>Time Frame</legend>
          <label htmlFor="timeFrame"> How soon will you buy this again?</label>
          <br />
          <input
            type="radio"
            id="soon"
            name="timeFrame"
            defaultChecked
            value="7"
            onChange={handleFormChange}
          />
          <label htmlFor="soon"> Soon</label>
          <br />
          <input
            type="radio"
            id="kinda-soon"
            name="timeFrame"
            value="14"
            onChange={handleFormChange}
          />
          <label htmlFor="kinda-soon"> Kinda Soon</label>
          <br />
          <input
            type="radio"
            id="not-soon"
            name="timeFrame"
            value="30"
            onChange={handleFormChange}
          />
          <label htmlFor="not-soon">Not Soon</label>
          <br />
        </fieldset>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
