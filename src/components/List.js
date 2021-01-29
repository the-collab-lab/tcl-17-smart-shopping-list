import React from 'react';
import { useHistory } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

const List = ({ token }) => {
  const { docs } = useFirestore(token);
  const history = useHistory();

  return (
    <div>
      <h1>List</h1>
      {docs.length === 0 && (
        <section>
          <p>Your shopping list is currently empty.</p>
          <button onClick={() => history.push('/add-item')}>Add an Item</button>
        </section>
      )}
      <ul>{docs && docs.map((doc) => <li key={doc.id}>{doc.itemName}</li>)}</ul>
    </div>
  );
};

export default List;
