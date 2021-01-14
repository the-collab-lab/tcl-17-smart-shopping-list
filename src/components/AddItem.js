import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../lib/firebase';

const initialFormState = {
  itemName: '',
  timeFrame: 7,
  lastPurchased: null,
};

const AddItem = () => {
  const token = 'user token';
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormState);

  const handleFormChange = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection(token).add(formData);
    history.push('/list');
    setFormData(initialFormState);
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
            value={formData.itemName}
            onChange={handleFormChange}
          />
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
        <button>Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;

//A shopping list item consists of the following data points:
// Name of item
// How soon are you likely to buy it again?
//  Soon (in the next 7 days)
//  Kind of soon (in the next 14 days)
//  Not soon (in the next 30 days)
// Last purchased date
