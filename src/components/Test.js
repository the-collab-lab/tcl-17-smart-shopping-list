import React, { useState, useEffect } from 'react';
import { fb } from '../lib/firebase';

const Test = () => {
  const db = fb.firestore();

  const [test, setTest] = useState([]);

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
      setTest(allTests);
    });
    return () => {
      console.log('cleanup');
      unsubscribe();
    };
  }, [db]);

  return (
    <div>
      <h1>Test</h1>
      <button type="button" onClick={handleClick}>
        Click Me!
      </button>
      <ul>
        {test.map((test) => (
          <li key={test.id}>{test.testMessage}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
