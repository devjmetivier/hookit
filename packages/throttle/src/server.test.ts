/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';
import { useThrottle } from './useThrottle';
import { useThrottledState } from './useThrottledState';

const initValue = 0;
const delay = 100;
const nextVal = 1;

describe('useThrottle SSR', () => {
  it('returns initial value', () => {
    const result = renderHookServer(() => useThrottle(initValue, delay));

    expect(result).toBe(initValue);
  });
});

describe('useThrottledState SSR', () => {
  it('returns initial value', () => {
    const [state, debouncedValue, setState] = renderHookServer(() => useThrottledState(initValue, delay));

    expect(state).toBe(initValue);
    expect(debouncedValue).toBe(initValue);

    // This shouldn't "actually" update state
    setState(nextVal);

    expect(state).toBe(initValue);
    expect(debouncedValue).toBe(initValue);
  });
});
