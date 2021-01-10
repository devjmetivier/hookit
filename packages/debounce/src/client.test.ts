import { act, renderHook } from '@testing-library/react-hooks';

import { useDebounce } from './useDebounce';
import { useDebouncedState } from './useDebouncedState';

const initValue = 0;
const delay = 100;
const nextVal = 1;
const nextValArr = [1, 2, 3, 4];

const runTimers = () =>
  setImmediate(() => {
    act(() => {
      jest.runAllTimers();
    });
  });

describe('useDebounce CSR', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useDebounce(initValue, delay));

    expect(result.current).toBe(initValue);
  });

  it('delays new values', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook((newVal) => useDebounce(newVal || initValue, delay));

    expect(result.current).toBe(initValue);

    rerender(nextVal);
    expect(result.current).toBe(initValue);

    runTimers();
    await waitForNextUpdate();

    expect(result.current).toBe(nextVal);
  });

  it('delays series of new values', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook((newVal) => useDebounce(newVal || initValue, delay));

    expect(result.current).toBe(initValue);

    // first
    rerender(nextValArr[0]);
    expect(result.current).toBe(initValue);

    runTimers();
    await waitForNextUpdate();

    expect(result.current).toBe(nextValArr[0]);

    // second
    rerender(nextValArr[1]);
    expect(result.current).toBe(nextValArr[0]);

    runTimers();
    await waitForNextUpdate();

    expect(result.current).toBe(nextValArr[1]);

    // third
    rerender(nextValArr[2]);
    expect(result.current).toBe(nextValArr[1]);

    runTimers();
    await waitForNextUpdate();

    expect(result.current).toBe(nextValArr[2]);

    // fourth
    rerender(nextValArr[3]);
    expect(result.current).toBe(nextValArr[2]);

    runTimers();
    await waitForNextUpdate();

    expect(result.current).toBe(nextValArr[3]);
  });
});

describe('useDebouncedState CSR', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useDebouncedState(initValue, delay));

    expect(result.current[0]).toBe(initValue);
    expect(result.current[1]).toBe(initValue);
  });

  it('delays new values', async () => {
    const { result, waitForNextUpdate } = renderHook((newVal) => useDebouncedState(newVal || initValue, delay));

    expect(result.current[0]).toBe(initValue);
    expect(result.current[1]).toBe(initValue);

    act(() => result.current[2](nextVal));
    expect(result.current[0]).toBe(nextVal);
    expect(result.current[1]).toBe(initValue);

    runTimers();
    await waitForNextUpdate();

    expect(result.current[0]).toBe(nextVal);
    expect(result.current[1]).toBe(nextVal);
  });

  it('delays series of new values', async () => {
    const { result, waitForNextUpdate } = renderHook((newVal) => useDebouncedState(newVal || initValue, delay));

    expect(result.current[0]).toBe(initValue);
    expect(result.current[1]).toBe(initValue);

    // first
    act(() => result.current[2](nextValArr[0]));
    expect(result.current[0]).toBe(nextValArr[0]);
    expect(result.current[1]).toBe(initValue);

    runTimers();
    await waitForNextUpdate();

    expect(result.current[0]).toBe(nextValArr[0]);
    expect(result.current[1]).toBe(nextValArr[0]);

    // second
    act(() => result.current[2](nextValArr[1]));
    expect(result.current[0]).toBe(nextValArr[1]);
    expect(result.current[1]).toBe(nextValArr[0]);

    runTimers();
    await waitForNextUpdate();

    expect(result.current[0]).toBe(nextValArr[1]);
    expect(result.current[1]).toBe(nextValArr[1]);

    // third
    act(() => result.current[2](nextValArr[2]));
    expect(result.current[0]).toBe(nextValArr[2]);
    expect(result.current[1]).toBe(nextValArr[1]);

    runTimers();
    await waitForNextUpdate();

    expect(result.current[0]).toBe(nextValArr[2]);
    expect(result.current[1]).toBe(nextValArr[2]);

    // fourth
    act(() => result.current[2](nextValArr[3]));
    expect(result.current[0]).toBe(nextValArr[3]);
    expect(result.current[1]).toBe(nextValArr[2]);

    runTimers();
    await waitForNextUpdate();

    expect(result.current[0]).toBe(nextValArr[3]);
    expect(result.current[1]).toBe(nextValArr[3]);
  });
});
