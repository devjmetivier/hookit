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

  it('onLine === undefined', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: undefined, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual(undefined);
  });

  it('onLine === true', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual(true);
  });

  it('onLine === false', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: false, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual(false);
  });

  it('adds listeners', () => {
    renderHook(() => useNetworkStatus());

    const onlineEvents = addEventListener.mock.calls.filter(([call]) => call === 'online');
    const offlineEvents = addEventListener.mock.calls.filter(([call]) => call === 'offline');

    expect(onlineEvents.length).toBe(1);
    expect(offlineEvents.length).toBe(1);
  });

  it('removes listeners', () => {
    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    const onlineEvents = removeEventListener.mock.calls.filter(([call]) => call === 'online');
    const offlineEvents = removeEventListener.mock.calls.filter(([call]) => call === 'offline');

    expect(onlineEvents.length).toBe(1);
    expect(offlineEvents.length).toBe(1);
  });

  it('changes status', () => {
    Object.defineProperty(window.navigator, 'onLine', { value: true, writable: true });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current).toEqual(true);

    act(() => {
      fireOffline();
    });

    expect(result.current).toEqual(false);

    act(() => {
      fireOnline();
    });

    expect(result.current).toEqual(true);
  });
});
