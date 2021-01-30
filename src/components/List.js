import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';

const List = ({ token }) => {
  const { docs } = useFirestore(token);

  const checkPurchasedDate = (purchasedDate) => {
    if (purchasedDate === null) {
      return false;
    }
    const today = new Date();
    const daySincePurchased = purchasedDate.toDate();

    daySincePurchased.setDate(daySincePurchased.getDate() + 1); // Add one day to the last purchased date

    // If today > daySincePurchased at least 24 hours have passed, return false to uncheck box
    if (today >= daySincePurchased) {
      return false;
    }

    return true;
  };

  const handleCheckbox = async (event) => {
    const currentDate = new Date();
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
