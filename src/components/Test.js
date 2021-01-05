import React from 'react';
import { fb } from '../lib/firebase';

const Test = () => {
  const db = fb.firestore();

  const handleClick = (event) => {
    event.preventDefault();
    db.collection('tests').add({
      testMessage: 'Hello World!',
    });
  };

  return (
    <div>
      <h1>Test</h1>
      <button type="button" onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
};

export default Test;
