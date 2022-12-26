import { useCallback, useEffect, useState } from "react";

const useMultipleTouch = (touchCallback, delay) => {
  const [touchAmount, setTouchAmount] = useState(0);
  const callback = useCallback(touchCallback, [touchAmount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTouchAmount(0);
    }, delay);

    callback(touchAmount);
    return () => clearTimeout(timer);
  }, [touchAmount, callback, delay]);

  return () => setTouchAmount(prev => prev + 1);
};

export default useMultipleTouch;
