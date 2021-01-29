import React from 'react';
import useFirestore from '../hooks/useFirestore';

const List = ({ token }) => {
  const { docs } = useFirestore(token);

  return (
    <div>
      <h1>List</h1>
      {docs.length === 0 && (
        <section>
          <p>Your shopping list is currently empty.</p>
          <a href="/add-item">Add an Item</a>
        </section>
      )}
      <ul>{docs && docs.map((doc) => <li key={doc.id}>{doc.itemName}</li>)}</ul>
    </div>
  );
};

export default List;
