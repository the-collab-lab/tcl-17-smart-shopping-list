import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (docs.length > 0) {
      return;
    }
    const unsubscribe = db.collection(collection).onSnapshot((snapshot) => {
      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
      return () => {
        unsubscribe();
      };
    });
  }, [collection, docs.length]);
  return { docs };
};

export default useFirestore;
