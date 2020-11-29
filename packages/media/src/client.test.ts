import { renderHook } from '@testing-library/react-hooks';

import useMedia from './useMedia';

const mq = ['(min-width: 1000px)', '(min-width: 500px)', '(min-width: 250px)'];
const mqValues = [3, 2, 1];
const mqDefault = 0;

describe('useMedia CSR', () => {
  it('matches first media query', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === mq[0] ? true : false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => useMedia(mq, mqValues, mqDefault));

    expect(result.current).toBe(mqValues[0]);
  });

  it('matches second media query', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === mq[1] ? true : false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => useMedia(mq, mqValues, mqDefault));

    expect(result.current).toBe(mqValues[1]);
  });

  it('matches third media query', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === mq[2] ? true : false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => useMedia(mq, mqValues, mqDefault));

    expect(result.current).toBe(mqValues[2]);
  });

  it('matches no media queries and defaults', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    });

    const { result } = renderHook(() => useMedia(mq, mqValues, mqDefault));

    expect(result.current).toBe(mqDefault);
  });
});
