import { useState, useEffect } from "react";

const useLocalStorage = (key, initialStorage) => {
  const [storage, setStorage] = useState();

  useEffect(() => {
    const receivedStorage = JSON.parse(localStorage.getItem(key));

    if (receivedStorage) {
      setStorage(receivedStorage);
    } else {
      localStorage.setItem(key, JSON.stringify(initialStorage));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!storage) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(storage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage]);

  return {
    storage,
    setStorage
  };
};

export default useLocalStorage;
