import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { db } from '../lib/firebase';

const List = ({ token }) => {
  const { docs } = useFirestore(token);
  const handleCheckbox = async (event) => {
    const currentDate = new Date();
    const nextDay = new Date();
    // localStorage.nextDay = nextDay.setDate(nextDay.getDate() + 1)
    console.log(event.target);
    const queryCollection = await db
      .collection(token)
      .doc(event.target.id)
      .get();
    // const snapshot = await queryCollection.get()
    queryCollection.data();
    console.log(queryCollection.data());
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
              />
              {doc.itemName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default List;
