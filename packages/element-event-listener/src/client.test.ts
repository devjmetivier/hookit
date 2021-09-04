import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useElementEventListener } from './useElementEventListener';

const element = document.createElement('div');

const addEventListener = jest.spyOn(element, 'addEventListener');
const removeEventListener = jest.spyOn(element, 'removeEventListener');

const event = 'click';
const handler = () => true;

// simulate window languagechange
const fireClickEvent = () => element.dispatchEvent(new Event(event));

describe('useElementEventListener CSR', () => {
  beforeEach(() => {
    addEventListener.mockClear();
    removeEventListener.mockClear();
  });

  it('adds listeners', () => {
    const { result } = renderHook(() => React.useRef(element));
    renderHook(() => useElementEventListener(result.current, event, handler));

    const clickEvent = addEventListener.mock.calls.filter(([call]) => call === event);

    act(() => {
      fireClickEvent();
    });

    expect(clickEvent.length).toBe(1);
  });

  it('removes listeners', () => {
    const { result } = renderHook(() => React.useRef(element));
    const { unmount } = renderHook(() => useElementEventListener(result.current, event, handler));

    unmount();

    const clickEvent = removeEventListener.mock.calls.filter(([call]) => call === event);

    expect(clickEvent.length).toBe(1);
  });

  it("gracefully fails when `element` argument doesn't support listeners", () => {
    renderHook(() => useElementEventListener((0 as unknown) as React.MutableRefObject<HTMLDivElement>, event, handler));

    const clickEvent = addEventListener.mock.calls.filter(([call]) => call === event);

    act(() => {
      fireClickEvent();
    });

    expect(clickEvent.length).toBe(0);
  });
});
