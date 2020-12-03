import { act, renderHook } from '@testing-library/react-hooks';

import useGeoLocation from './useGeoLocation';

const positions: Position[] = [
  [52.520007, 13.404954, 1559129501234],
  [51.507351, -0.127758, 1559129601234],
  [37.774929, -122.419416, 1559129701234],
].map(([latitude, longitude, timestamp]) => ({
  coords: {
    accuracy: 1.1,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude,
    longitude,
    speed: null,
  },
  timestamp,
}));

const lastCallOf = ({ mock: { results } }: jest.Mock) => {
  const [{ value }] = results.reverse();

  return value;
};

const watchPositionMock = jest.fn((handleSuccess: Function, handleError: Function, options: PositionOptions) => ({
  handleError,
  handleSuccess,
  options,
}));
const clearWatchMock = jest.fn();

Object.defineProperty(window.navigator, 'geolocation', {
  value: {
    clearWatch: clearWatchMock,
    watchPosition: watchPositionMock,
  },
  writable: true,
});

describe('useGeoLocation CSR', () => {
  beforeEach(() => {
    watchPositionMock.mockClear();
    clearWatchMock.mockClear();
  });

  test('returns initial null state', () => {
    const { result } = renderHook(() => useGeoLocation());

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBeUndefined();
  });

  test('returns current location', () => {
    const { result } = renderHook(() => useGeoLocation());
    const { handleSuccess } = lastCallOf(watchPositionMock);

    act(() => {
      handleSuccess(positions[0]);
    });

    expect(result.current[0]).toBe(positions[0]);
    expect(result.current[1]).toBeUndefined();
  });

  test('passes options to watch', () => {
    const options = {
      enableHighAccuracy: true,
    };

    renderHook(() => useGeoLocation(options));

    const { options: returnedOptions } = lastCallOf(watchPositionMock);

    expect(returnedOptions).toBe(options);
  });

  test('option change should invalidate effect', () => {
    const initialProps = { enableHighAccuracy: true };
    const { rerender } = renderHook((options) => useGeoLocation(options), {
      initialProps,
    });

    rerender(initialProps);

    expect(clearWatchMock).not.toHaveBeenCalled();

    rerender({ enableHighAccuracy: false });

    expect(clearWatchMock).toHaveBeenCalled();
  });

  test('handles a new position', () => {
    const { result } = renderHook(() => useGeoLocation());
    const { handleSuccess } = lastCallOf(watchPositionMock);

    act(() => handleSuccess(positions[0]));

    expect(result.current[0]).toBe(positions[0]);

    act(() => handleSuccess(positions[1]));

    expect(result.current[0]).toBe(positions[1]);
  });

  test('handles error', () => {
    const { result } = renderHook(() => useGeoLocation());
    const { handleError } = lastCallOf(watchPositionMock);
    const error = { code: 3, message: 'Timeout' };

    expect(result.current[1]).toBeUndefined();

    act(() => handleError(error));

    expect(result.current[1]).toBe(error);
  });
});
