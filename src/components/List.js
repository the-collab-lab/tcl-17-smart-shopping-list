import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';
import Error from './Error';
import calculateEstimate from './../lib/estimates';
import { differenceInDays, addDays } from 'date-fns';

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
    // time given in milliseconds
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
    const currentDate = Date.now(); // time given in milliseconds
    const queryCollection = await db.collection(token).doc(event.target.id);
    // listItem is our current snapshot of the doc
    const listItem = docs.filter((doc) => doc.id === queryCollection.id)[0];
    const previouslyPurchasedDate = listItem.lastPurchased;

    /* latestInterval is the number of full days between the two dates
     * or the timeFrame if the function returns NaN
     */
    const latestInterval =
      differenceInDays(currentDate, previouslyPurchasedDate) ||
      listItem.timeFrame;

    // If item has not been purchased set to 1, else increment by 1
    const numberOfPurchases = (listItem.numberOfPurchases || 0) + 1;
    const daysUntilNextPurchase = calculateEstimate(
      listItem.timeFrame,
      latestInterval,
      numberOfPurchases,
    );

    queryCollection.update({
      lastPurchased: currentDate,
      timeFrame: daysUntilNextPurchase,
      numberOfPurchases,
    });
  };

  /* Function updates daysUntilNextPurchase when user reloads the app
   * Used below when rendering List
   */
  const getDaysUntilNextPurchase = (doc) => {
    const nextPurchasedDate = addDays(doc.lastPurchased, doc.timeFrame);

    /* Added 1 here since we're working with full days
     * if user taps a checkbox and the timeFrame was 7 days, 6 would have been displayed
     */
    const daysUntilNextPurchase =
      differenceInDays(nextPurchasedDate, Date.now()) + 1;
    return daysUntilNextPurchase > 0 ? daysUntilNextPurchase : 0;
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
            ?.filter((doc) =>
              doc?.itemName
                ?.toLowerCase()
                ?.includes(searchInput.toLowerCase().trim()),
            )
            ?.map((doc) => {
              return (
                <li key={doc.id}>
                  <input
                    type="checkbox"
                    aria-label="purchased-checkbox"
                    name={doc.itemName}
                    id={doc.id}
                    onChange={handleCheckbox}
                    checked={checkPurchasedDate(doc.lastPurchased)}
                    disabled={checkPurchasedDate(doc.lastPurchased)}
                  />
                  {doc.itemName}
                  {doc.numberOfPurchases > 0 ? (
                    <p>
                      Time until next purchase: {getDaysUntilNextPurchase(doc)}{' '}
                      days
                    </p>
                  ) : (
                    <p>You haven't purchased {doc.itemName} yet.</p>
                  )}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default List;

// User is able to delete an item from the shopping list
// Before deleting, prompt the user to confirm that they really want to delete the item to prevent accidental deletions
// Deletion should cause the associated record(s) in the database to be deleted
