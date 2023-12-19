import { useState } from 'react';

import { useDebounce } from './useDebounce';

export const useDebouncedState = <Value = unknown>(
  defaultValue: Value,
  delay: number,
): [Value, Value, React.Dispatch<React.SetStateAction<Value>>] => {
  const [state, setState] = useState(defaultValue);
  const debouncedValue = useDebounce(state, delay);

  return [state, debouncedValue, setState];
};
