import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
//todo - add Loading screen

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(
    "Something's terribly wrong!",
  );

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = db.collection(collection).onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    } catch (error) {
      setErrorMessage(error);
    }

    return () => {
      unsubscribe();
    };
  }, [collection]);

  return { docs, errorMessage };
};

export default useFirestore;
