import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';

const Test = () => {
  const [tests, setTests] = useState([]);

  const handleClick = (event) => {
    event.preventDefault();
    db.collection('tests').add({
      testMessage: 'Hello World!',
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection('tests').onSnapshot((snapshot) => {
      const allTests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTests(allTests);
    });
    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <React.Fragment>
      <h1>Test</h1>
      <button type="button" onClick={handleClick}>
        Click Me!
      </button>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>{test.testMessage}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Test;
