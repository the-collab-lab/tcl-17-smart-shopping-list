import React from 'react';
import useFirestore from '../hooks/useFirestore';
import Error from './Error';

const List = ({ token }) => {
  const { docs, errorMessage } = useFirestore(token);

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
      <ul>{docs && docs.map((doc) => <li key={doc.id}>{doc.itemName}</li>)}</ul>
    </div>
  );
};

export default List;
