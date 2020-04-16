import { renderHook } from '@testing-library/react-hooks';
import useInterval from './useInterval';

describe('useInterval CSR', () => {
  const callback = jest.fn().mockName('mock callback');

  afterEach(() => {
    callback.mockClear();
  });

  it('executes callback after delay', () => {
    renderHook(({ interval }) => useInterval(callback, interval), {
      initialProps: { interval: 500 },
    });

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('pauses interval if delay === null', () => {
    const { rerender } = renderHook(({ interval }) => useInterval(callback, interval), {
      initialProps: { interval: 500 },
    });

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ interval: null });

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ interval: 500 });

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
