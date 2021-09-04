import * as React from 'react';

import { useDebounce } from './useDebounce';

export const useDebouncedState = <Value = unknown>(
  defaultValue: Value,
  delay: number,
): [Value, Value, React.Dispatch<React.SetStateAction<Value>>] => {
  const [state, setState] = React.useState(defaultValue);
  const debouncedValue = useDebounce(state, delay);

  return [state, debouncedValue, setState];
};
