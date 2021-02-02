import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';
import Error from './Error';
//IMPORT ESTIMATE.JS
import calculateEstimate from './../lib/estimates';

const List = ({ token }) => {
  const { docs, errorMessage } = useFirestore(token);

  const checkPurchasedDate = (purchasedDate) => {
    if (purchasedDate === null) {
      return false;
    }
    // changed to using Date.now(), time given in milliseconds
    const today = Date.now();
    // 24 hours in milliseconds
    const addOneDay = 86400000;
    // Add 24 hours to purchased
    const oneDayAfterPurchase = purchasedDate + 1000; //CHANGE 1000 BACK TO ADDONEDAY

    // If today > oneDayAfterPurchase at least 24 hours have passed, return false to uncheck box
    if (today >= oneDayAfterPurchase) {
      return false;
    }

    return true;
  };

  const handleCheckbox = async (event) => {
    const currentDate = Date.now(); // changed to using Date.now(), time given in milliseconds
    const queryCollection = await db.collection(token).doc(event.target.id);

    //MY TEST CODE STARTS
    const targetDoc = docs.filter((doc) => doc.id === queryCollection.id);
    const previouslyPurchasedDate = targetDoc[0].lastPurchased;
    const latestInterval = currentDate - previouslyPurchasedDate;

    console.log(
      "lastPurchased before it's updated :",
      new Date(targetDoc[0].lastPurchased),
    );
    console.log("the currentDate - today's date :", new Date(currentDate));
    console.log(
      "the latest interval - previous purchase date - today's date :",
      latestInterval / 1000,
    );
    console.log('the timeFrame :', targetDoc[0].timeFrame);

    const exampleNumberOfPurchases = 2;
    const estimate = calculateEstimate(
      targetDoc[0].timeFrame,
      latestInterval,
      exampleNumberOfPurchases,
    );
    console.log('estimate :', estimate / 1000);
    // just need to update so that we initially have a field (ex: numberOfTimesPurchased: null) to the data model
    // every time the item is checked, the value for that field increases by 1 (may have to manipulate this a little)
    // then that will be the numberOfPurchases to pass into the calculateEstimate function
    //MY TEST CODE ENDS

    queryCollection.update({
      lastPurchased: currentDate,
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
              />
              {doc.itemName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;
