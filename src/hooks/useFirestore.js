import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

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
      console.log(error);
    }

    return () => {
      unsubscribe();
    };
  }, [collection]);

  return { docs };
};

export default useFirestore;
