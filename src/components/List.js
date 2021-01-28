import React, { useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';

const List = ({ token }) => {
  const { docs } = useFirestore(token);
  const [checked, setChecked] = useState();
  // console.log(checked)

  const isChecked = async (id) => {
    const queryCollection = await db.collection(token).doc(id).get();
    const nextDay = new Date();
    if (queryCollection.data().lastPurchased !== null) {
      const lastPurchased = queryCollection.data().lastPurchased.toDate();
      nextDay.setDate(lastPurchased.getDate() + 1);
    }
    const now = new Date();
    if (now > nextDay) {
      console.log('More than 24 hours have passed');
      setChecked(false);
    }
    console.log('Less than 24 hours have passed');
  };

  const handleCheckbox = async (event) => {
    const currentDate = new Date();
    const nextDay = new Date();
    const queryCollection = await db.collection(token).doc(event.target.id);
    queryCollection.update({
      lastPurchased: currentDate,
    });
    // setChecked(true)
    // isChecked(event.target.id)
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
                onClick={handleCheckbox}
                // onChange={isChecked(doc.id)}
                // checked={checked}
              />
              {doc.itemName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;
