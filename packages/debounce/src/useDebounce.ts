import { useEffect, useState } from 'react';

export const useDebounce = <Value = unknown>(value: Value, delay: number): Value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
