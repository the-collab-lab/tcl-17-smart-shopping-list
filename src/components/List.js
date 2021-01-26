import React from 'react';
import useFirestore from '../hooks/useFirestore';

const List = ({ token }) => {
  const { docs } = useFirestore(token);
  return (
    <div>
      <h1>List</h1>
      <ul>{docs && docs.map((doc) => <li key={doc.id}>{doc.itemName}</li>)}</ul>
    </div>
  );
};

export default List;

//Issue 7 AC:
// The list view, when there are no items to display, should show a prompt (e.g., a button) for the user to add their first item
// When the user clicks on the add item Button, they should be routed to the Add Item page.
