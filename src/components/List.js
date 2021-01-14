import React from 'react';
import useFirestore from '../hooks/useFirestore';

const List = () => {
  const { docs } = useFirestore('user token');
  console.log(docs);
  return (
    <div>
      <h1>List</h1>
      <ul>{docs && docs.map((doc) => <li key={doc.id}>{doc.itemName}</li>)}</ul>
    </div>
  );
};

export default List;
