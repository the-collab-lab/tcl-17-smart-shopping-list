import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';
import Error from './Error';
import calculateEstimate from './../lib/estimates';
import { differenceInDays, addDays } from 'date-fns';
import '../styles/List.css';
import {
  Box,
  Checkbox,
  List as MuiList,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';

const List = ({ token }) => {
  const { docs, errorMessage, deleteDoc, loading } = useFirestore(token);
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

  // Confirm that the user would like to delete this item
  const confirmDelete = (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${item.itemName}?`,
    );
    if (confirmed) {
      deleteDoc(item);
    }
  };

  const sortedList = docs.sort((a, b) => {
    const aDaysUntilNextPurchase = getDaysUntilNextPurchase(a);
    const bDaysUntilNextPurchase = getDaysUntilNextPurchase(b);

    switch (true) {
      case !isInactive(a) && isInactive(b):
        return -1;
      case isInactive(a) && !isInactive(b):
        return 1;

      case aDaysUntilNextPurchase < bDaysUntilNextPurchase:
        return -1;
      case aDaysUntilNextPurchase > bDaysUntilNextPurchase:
        return 1;
      default:
        return a.itemName < b.itemName ? -1 : 1;
    }
  });

  function isInactive(item) {
    if (!item.numberOfPurchases || item.numberOfPurchases < 2) {
      return true;
    }
    return false;
  }

  const backgroundColor = (item) => {
    const daysUntilNextPurchase = getDaysUntilNextPurchase(item);
    if (isInactive(item)) return 'inactive';
    if (daysUntilNextPurchase < 7) return 'soon';
    if (daysUntilNextPurchase >= 7 && daysUntilNextPurchase < 30)
      return 'kind-of-soon';
    if (daysUntilNextPurchase >= 30) return 'not-too-soon';
  };

  const checkboxColor = {
    inactive: 'lightgrey',
    soon: 'red',
    'kind-of-soon': 'orange',
    'not-too-soon': 'yellow',
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <React.Fragment>
          {docs.length === 0 ? (
            <section>
              <p>Your shopping list is currently empty.</p>
              <a className="add-item-link" href="/add-item">
                <i class="fas fa-cart-plus"></i>
                Add Item
              </a>
            </section>
          ) : (
            <div className="top-container">
              <h1>List</h1>
              <a className="add-item-link" href="/add-item">
                <i class="fas fa-cart-plus"></i>
                Add Item
              </a>
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
          <MuiList>
            {sortedList &&
              sortedList
                ?.filter((item) =>
                  item?.itemName
                    ?.toLowerCase()
                    ?.includes(searchInput.toLowerCase().trim()),
                )
                ?.map((item) => {
                  return (
                    <ListItem
                      divider
                      key={item.id}
                      className={backgroundColor(item)}
                      aria-label={`${
                        item.itemName
                      } ready to purchase ${backgroundColor(item)}`}
                    >
                      <div className="flex-container">
                        <Checkbox
                          type="checkbox"
                          icon={
                            <CircleUnchecked
                              style={{
                                color: checkboxColor[backgroundColor(item)],
                              }}
                            />
                          }
                          checkedIcon={
                            <CircleCheckedFilled
                              style={{
                                color: checkboxColor[backgroundColor(item)],
                              }}
                            />
                          }
                          aria-label="purchased-checkbox"
                          name={item.itemName}
                          id={item.id}
                          onChange={handleCheckbox}
                          checked={checkPurchasedDate(item.lastPurchased)}
                          disabled={checkPurchasedDate(item.lastPurchased)}
                        />
                        <ListItemText primary={item.itemName} />
                        <button onClick={() => confirmDelete(item)}>
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </ListItem>
                  );
                })}
          </MuiList>
        </React.Fragment>
      )}
    </div>
  );
};

export default List;
