import { act, renderHook } from '@testing-library/react-hooks';

import useGeoLocation from './useGeoLocation';

const positions: GeolocationPosition[] = [
  [42.332365, -83.0471307, 1607393783000],
  [28.5965603, -81.3035348, 1607393783000],
  [36.2490021, -85.5707212, 1607393783000],
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
const getCurrentPositionMock = jest.fn((handleSuccess: Function, handleError: Function, options: PositionOptions) => ({
  handleError,
  handleSuccess,
  options,
}));
const clearWatchMock = jest.fn();

Object.defineProperty(window.navigator, 'geolocation', {
  value: {
    clearWatch: clearWatchMock,
    getCurrentPosition: getCurrentPositionMock,
    watchPosition: watchPositionMock,
  },
  writable: true,
});

describe('useGeoLocation CSR', () => {
  beforeEach(() => {
    clearWatchMock.mockClear();
    getCurrentPositionMock.mockClear();
    watchPositionMock.mockClear();
  });

  test('returns initial null state with watch', () => {
    const { result } = renderHook(() => useGeoLocation(true));

    expect(result.current.geoLocation).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  test('returns current location with watch', () => {
    const { result } = renderHook(() => useGeoLocation(true));
    const { handleSuccess } = lastCallOf(watchPositionMock);

    act(() => {
      handleSuccess(positions[0]);
    });

    expect(result.current.geoLocation).toBe(positions[0]);
    expect(result.current.error).toBeUndefined();
  });

  test('passes options with watch', () => {
    const options = {
      enableHighAccuracy: true,
    };

    renderHook(() => useGeoLocation(true, options));

    const { options: returnedOptions } = lastCallOf(watchPositionMock);

    expect(returnedOptions).toBe(options);
  });

  test('option change should invalidate effect with watch', () => {
    const initialProps = { enableHighAccuracy: true };
    const { rerender } = renderHook((options) => useGeoLocation(true, options), {
      initialProps,
    });

    rerender(initialProps);

    expect(clearWatchMock).not.toHaveBeenCalled();

    rerender({ enableHighAccuracy: false });

    expect(clearWatchMock).toHaveBeenCalled();
  });

  test('handles a new position with watch', () => {
    const { result } = renderHook(() => useGeoLocation(true));
    const { handleSuccess } = lastCallOf(watchPositionMock);

    act(() => handleSuccess(positions[0]));

    expect(result.current.geoLocation).toBe(positions[0]);

    act(() => handleSuccess(positions[1]));

    expect(result.current.geoLocation).toBe(positions[1]);
  });

  test('handles a new position with call', () => {
    const { result } = renderHook(() => useGeoLocation());

    act(() => {
      result.current.getPosition();
    });

    const firstLastCall = lastCallOf(getCurrentPositionMock);

    act(() => firstLastCall.handleSuccess(positions[0]));

    expect(result.current.geoLocation).toBe(positions[0]);

    act(() => {
      result.current.getPosition();
    });

    const secondLastCall = lastCallOf(getCurrentPositionMock);

    act(() => secondLastCall.handleSuccess(positions[1]));

    expect(result.current.geoLocation).toBe(positions[1]);
  });

  test('handles error with watch', () => {
    const { result } = renderHook(() => useGeoLocation(true));
    const { handleError } = lastCallOf(watchPositionMock);
    const error = { code: 3, message: 'Timeout' };

    expect(result.current.error).toBeUndefined();

    act(() => handleError(error));

    expect(result.current.error).toBe(error);
  });
});
