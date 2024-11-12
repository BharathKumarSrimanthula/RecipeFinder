import { useState, useEffect } from "react";

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // Clean up the timeout on value change
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
