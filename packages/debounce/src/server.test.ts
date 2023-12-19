/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';
import { useDebounce } from './useDebounce';
import { useDebouncedState } from './useDebouncedState';

const initValue = 0;
const delay = 100;
const nextVal = 1;

describe('useDebounce SSR', () => {
  it('returns initial value', () => {
    const result = renderHookServer(() => useDebounce(initValue, delay));

    expect(result).toBe(initValue);
  });
});

describe('useDebouncedState SSR', () => {
  it('returns initial value', () => {
    const [state, debouncedValue, setState] = renderHookServer(() => useDebouncedState(initValue, delay));

    expect(state).toBe(initValue);
    expect(debouncedValue).toBe(initValue);

    // This shouldn't "actually" update state
    setState(nextVal);

    expect(state).toBe(initValue);
    expect(debouncedValue).toBe(initValue);
  });
});
