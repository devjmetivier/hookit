import { act, renderHook } from '@testing-library/react-hooks';

import { useThrottle } from './useThrottle';
import { useThrottledState } from './useThrottledState';

const initValue = 0;
const delay = 100;
const nextVal = 1;
const nextValArr = [1, 2, 3, 4];

const advance = (ms: number = 101) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

const advanceUnder = (ms: number = 50) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

describe('useThrottle CSR', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  it('returns initial value', () => {
    const { result } = renderHook(() => useThrottle(initValue, delay));

    expect(result.current).toBe(initValue);
  });

  it('delays new values', async () => {
    const { result, rerender } = renderHook((newVal) => useThrottle(newVal || initValue, delay));

    rerender(nextVal);
    expect(result.current).toBe(initValue);

    advance();

    rerender(nextVal);
    expect(result.current).toBe(nextVal);
  });

  it('delays new values up to exact threshold', async () => {
    const { result, rerender } = renderHook((newVal) => useThrottle(newVal || initValue, delay));

    rerender(nextVal);
    expect(result.current).toBe(initValue);

    advance(100);

    rerender(nextVal);
    expect(result.current).toBe(nextVal);

    rerender(nextVal + 1);
    expect(result.current).toBe(nextVal);
  });

  it('delays series of new values', async () => {
    const { result, rerender } = renderHook((newVal) => useThrottle(newVal || initValue, delay));

    // first
    rerender(nextValArr[0]);
    expect(result.current).toBe(initValue);

    advance();

    rerender(nextValArr[0]);
    expect(result.current).toBe(nextValArr[0]);

    // second
    rerender(nextValArr[1]);
    expect(result.current).toBe(nextValArr[0]);

    advance();

    rerender(nextValArr[1]);
    expect(result.current).toBe(nextValArr[1]);

    // third
    rerender(nextValArr[2]);
    expect(result.current).toBe(nextValArr[1]);

    advance();

    rerender(nextValArr[2]);
    expect(result.current).toBe(nextValArr[2]);

    // fourth
    rerender(nextValArr[3]);
    expect(result.current).toBe(nextValArr[2]);

    advance();

    rerender(nextValArr[3]);
    expect(result.current).toBe(nextValArr[3]);
  });
});

describe('useThrottledState CSR', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useThrottledState(initValue, delay));

    expect(result.current[0]).toBe(initValue);
    expect(result.current[1]).toBe(initValue);
  });

  it('delays new values', async () => {
    const { result } = renderHook((newVal) => useThrottledState(newVal || initValue, delay));

    act(() => result.current[2](nextVal));
    expect(result.current[0]).toBe(nextVal);
    expect(result.current[1]).toBe(initValue);

    advance();

    expect(result.current[0]).toBe(nextVal);
    expect(result.current[1]).toBe(nextVal);
  });

  it('delays series of new values', async () => {
    const { result } = renderHook((newVal) => useThrottledState(newVal || initValue, delay));

    // first
    act(() => result.current[2](nextValArr[0]));
    expect(result.current[0]).toBe(nextValArr[0]);
    expect(result.current[1]).toBe(initValue);

    advance();

    expect(result.current[0]).toBe(nextValArr[0]);
    expect(result.current[1]).toBe(nextValArr[0]);

    // second
    act(() => result.current[2](nextValArr[1]));
    expect(result.current[0]).toBe(nextValArr[1]);
    expect(result.current[1]).toBe(nextValArr[0]);

    advance();

    expect(result.current[0]).toBe(nextValArr[1]);
    expect(result.current[1]).toBe(nextValArr[1]);

    // third
    act(() => result.current[2](nextValArr[2]));
    expect(result.current[0]).toBe(nextValArr[2]);
    expect(result.current[1]).toBe(nextValArr[1]);

    advance();

    expect(result.current[0]).toBe(nextValArr[2]);
    expect(result.current[1]).toBe(nextValArr[2]);

    // fourth
    act(() => result.current[2](nextValArr[3]));
    expect(result.current[0]).toBe(nextValArr[3]);
    expect(result.current[1]).toBe(nextValArr[2]);

    advance();

    expect(result.current[0]).toBe(nextValArr[3]);
    expect(result.current[1]).toBe(nextValArr[3]);
  });
});
