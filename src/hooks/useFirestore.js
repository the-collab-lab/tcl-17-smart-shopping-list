import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = db.collection(collection).onSnapshot((snapshot) => {
      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setLoading(true);
      setDocs(documents);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [collection]);

  return { docs, loading };
};

export default useFirestore;
