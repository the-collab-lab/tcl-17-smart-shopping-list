import React from 'react';
import { db } from '../lib/firebase';
import useFirestore from '../hooks/useFirestore';

const Test = () => {
  const { docs } = useFirestore('tests');

  const handleClick = (event) => {
    event.preventDefault();
    db.collection('tests').add({
      testMessage: 'Hello World!',
    });
  };

  return (
    <React.Fragment>
      <h1>Test</h1>
      <button type="button" onClick={handleClick}>
        Click Me!
      </button>
      <ul>
        {docs && docs.map((doc) => <li key={doc.id}>{doc.testMessage}</li>)}
      </ul>
    </React.Fragment>
  );
};

export default Test;
