import { useState } from 'react';

import { useThrottle } from './useThrottle';

export const useThrottledState = <Value = any>(
  defaultValue: Value,
  delay: number,
): [Value, Value, React.Dispatch<React.SetStateAction<Value>>] => {
  const [state, setState] = useState(defaultValue);
  const throttledValue = useThrottle(state, delay);

  return [state, throttledValue, setState];
};
