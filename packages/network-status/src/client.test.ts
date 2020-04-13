import { renderHook, act } from '@testing-library/react-hooks';
import useNetworkStatus from './useNetworkStatus';

const addEventListener = jest.spyOn(window, 'addEventListener');
const removeEventListener = jest.spyOn(window, 'removeEventListener');

// simulate window online/offline
const fireOnline = () => window.dispatchEvent(new Event('online'));
const fireOffline = () => window.dispatchEvent(new Event('offline'));

describe('useNetworkStatus CSR', () => {
  beforeEach(() => {
    addEventListener.mockClear();
    removeEventListener.mockClear();
  });

  test('online === undefined', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: undefined, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual({ status: undefined });
  });

  test('online === true', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual({ status: true });
  });

  test('online === false', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual({ status: false });
  });

  test('add listeners', () => {
    renderHook(() => useNetworkStatus());

    const onlineEvents = addEventListener.mock.calls.filter(([call]) => call === 'online');
    const offlineEvents = addEventListener.mock.calls.filter(([call]) => call === 'offline');

    expect(onlineEvents.length).toBe(1);
    expect(offlineEvents.length).toBe(1);
  });

  test('remove listeners', () => {
    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    const onlineEvents = removeEventListener.mock.calls.filter(([call]) => call === 'online');
    const offlineEvents = removeEventListener.mock.calls.filter(([call]) => call === 'offline');

    expect(onlineEvents.length).toBe(1);
    expect(offlineEvents.length).toBe(1);
  });

  test('status changes', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual({ status: true });

    act(() => {
      fireOffline();
    });

    expect(result.current).toEqual({ status: false });

    act(() => {
      fireOnline();
    });

    expect(result.current).toEqual({ status: true });
  });
});
