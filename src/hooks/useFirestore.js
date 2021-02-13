import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
//todo - add Loading screen

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  const deleteDoc = (item) => {
    try {
      db.collection(collection).doc(item.id).delete();
    } catch (error) {
      console.error(error.message);
      setErrorMessage(`Problem deleting ${item.itemName}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return { docs, errorMessage, deleteDoc };
};

export default useFirestore;
