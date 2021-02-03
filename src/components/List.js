import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';
import Error from './Error';

const List = ({ token }) => {
  const { docs, errorMessage } = useFirestore(token);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClear = () => {
    setSearchInput('');
  };

  const checkPurchasedDate = (purchasedDate) => {
    if (purchasedDate === null) {
      return false;
    }
    // changed to using Date.now(), time given in milliseconds
    const today = Date.now();
    // 24 hours in milliseconds
    const addOneDay = 86400000;
    // Add 24 hours to purchased
    const oneDayAfterPurchase = purchasedDate + addOneDay;

    // If today > oneDayAfterPurchase at least 24 hours have passed, return false to uncheck box
    if (today >= oneDayAfterPurchase) {
      return false;
    }

    return true;
  };

  const handleCheckbox = async (event) => {
    const currentDate = Date.now(); // changed to using Date.now(), time given in milliseconds
    const queryCollection = await db.collection(token).doc(event.target.id);
    queryCollection.update({
      lastPurchased: currentDate,
    });
  };
  return (
    <div>
      <h1>List</h1>

      {docs.length === 0 ? (
        <section>
          <p>Your shopping list is currently empty.</p>
          <a href="/add-item">Add an Item</a>
        </section>
      ) : (
        <div>
          <label htmlFor="search-bar">Filter Items</label>
          <br />
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Start typing here..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          <input type="reset" onClick={handleClear} />
        </div>
      )}

      {errorMessage && <Error errorMessage={errorMessage} />}

      <ul style={{ listStyleType: 'none' }}>
        {docs &&
          docs
            .filter((doc) =>
              doc.itemName
                .toLowerCase()
                .includes(searchInput.toLowerCase().trim()),
            )
            .map((doc) => (
              <li key={doc.id}>
                <input
                  type="checkbox"
                  name={doc.itemName}
                  id={doc.id}
                  onChange={handleCheckbox}
                  checked={checkPurchasedDate(doc.lastPurchased)}
                />
                {doc.itemName}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default List;
