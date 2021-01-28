import { renderHook, act } from '@testing-library/react-hooks';
import { useWindowEventListener } from './useWindowEventListener';

const addEventListener = jest.spyOn(window, 'addEventListener');
const removeEventListener = jest.spyOn(window, 'removeEventListener');

const event = 'languagechange';
const handler = () => true;

// simulate window languagechange
const fireLanguageChange = () => window.dispatchEvent(new Event(event));

describe('useWindowEventListener CSR', () => {
  beforeEach(() => {
    addEventListener.mockClear();
    removeEventListener.mockClear();
  });

  it('adds listeners', () => {
    renderHook(() => useWindowEventListener(event, handler));

    const languageChangeEvent = addEventListener.mock.calls.filter(([call]) => call === event);

    act(() => {
      fireLanguageChange();
    });

    expect(languageChangeEvent.length).toBe(1);
  });

  it('removes listeners', () => {
    const { unmount } = renderHook(() => useWindowEventListener(event, handler));

    unmount();

    const languageChangeEvent = removeEventListener.mock.calls.filter(([call]) => call === event);

    expect(languageChangeEvent.length).toBe(1);
  });
});
