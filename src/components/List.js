import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';

const List = ({ token }) => {
  const { docs } = useFirestore(token);

  const checkPurchasedDate = (purchasedDate) => {
    if (purchasedDate === null) {
      return false;
    }
    // changed to using Date.now(), time given in milliseconds
    const today = Date.now();
    /* Passing today as milliseconds to new Date(), gives us a readable date format
       Console logging so we can see this is the case */
    console.log(new Date(today));
    // 24 hours in milliseconds
    const addOneDay = 86400000;
    // Set to 5 seconds after purchase for testing, should read purchasedDate + addOneDay
    const oneDayAfterPurchase = purchasedDate + 5000;

    // The line below is no longer necessary
    // daySincePurchased.setDate(daySincePurchased.getDate() + 1); // Add one day to the last purchased date

    // If today > oneDayAfterPurchase at least 24 hours have passed, return false to uncheck box
    /* I simplified the condition after Chris pointed out that both were Date objects
    and we didn't need the toString. I then figured we didn't need Date.parse since
    we're working with Date objects */
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
