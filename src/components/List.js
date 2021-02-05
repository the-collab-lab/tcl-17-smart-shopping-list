import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';
import Error from './Error';
import calculateEstimate from './../lib/estimates';

const List = ({ token }) => {
  const { docs, errorMessage } = useFirestore(token);

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
    const id = event.target.id
    const currentDate = Date.now(); // time given in milliseconds
    // listItem is our current snapshot of the doc
    const listItem = docs.filter((doc) => doc.id === id)[0];

    const previouslyPurchasedDate = listItem.lastPurchased;

    // Get diff in milliseconds then convert to number of days (round it, too so it's a whole number)
    // If no previous purchase date, use the timeFrame the user originally put in
    const latestInterval = previouslyPurchasedDate ? Math.round((currentDate - previouslyPurchasedDate)/86400000) : listItem.timeFrame;

    // If item has not been purchased set to 1, else increment by 1
    const numberOfPurchases = !listItem.numberOfPurchases
      ? 1
      : listItem.numberOfPurchases + 1;

    const timeUntilNextPurchase = calculateEstimate(
      listItem.timeUntilNextPurchase || listItem.timeFrame, // use time frame if there is no previously recorded timeUntilNextPurchase
      latestInterval,
      numberOfPurchases,
    );

      db.collection(token).doc(event.target.id).update({
        lastPurchased: currentDate,
        timeUntilNextPurchase: timeUntilNextPurchase,
        numberOfPurchases: numberOfPurchases
      });
  };

  return (
    <div>
      <h1>List</h1>

      {docs.length === 0 && (
        <section>
          <p>Your shopping list is currently empty.</p>
          <a href="/add-item">Add an Item</a>
        </section>
      )}

      {errorMessage && <Error errorMessage={errorMessage} />}

      <ul style={{ listStyleType: 'none' }}>
        {docs &&
          docs.map((doc) => (
            <li key={doc.id}>
              <input
                type="checkbox"
                name={doc.itemName}
                id={doc.id}
                onChange={handleCheckbox}
                checked={checkPurchasedDate(doc.lastPurchased)}
                disabled={checkPurchasedDate(doc.lastPurchased)} // Commented out for PR purposes only
              />
              {doc.itemName}
              {doc.numberOfPurchases > 0 ? (
                <p>Days until next purchase {doc.timeUntilNextPurchase}</p>
              ) : (
                <p>You haven't purchased {doc.itemName} yet</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;
