import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';

const List = ({ token }) => {
  const { docs } = useFirestore(token);
  const checkPurchasedDate = (purchasedDate) => {
    const today = new Date();
    // If today < purchased date, returns false to uncheck the box
    let daySincePurchased = purchasedDate.toDate();
    // Add one day to the last purchased date
    // console.log(daySincePurchased);
    daySincePurchased.setDate(daySincePurchased.getDate() + 1);
    console.log(daySincePurchased);
    // nextDay.setDate(testDate.getDate() + 1);
    // console.log("Today", today.toString());
    // console.log("Purchased Date", purchasedDate.toDate());
    // console.log("Puchased date + 1 day", nextDay);
    // console.log(Date.parse(today.toString()) >= Date.parse(daySincePurchased.toDate()))
    // If today > daySincePurchased at least 24 hours have passed, return false to uncheck box
    if (
      Date.parse(today.toString()) >= Date.parse(daySincePurchased.toString())
    ) {
      return false;
    } else {
      return true;
    }

    // return Date.parse(today.toString()) < Date.parse(purchasedDate.toDate())
    // nextDay.setDate(lastPurchased.getDate() + 1);
    // console.log(today.getDate() - purchasedDate <= 1)
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
