import { renderHook, act } from '@testing-library/react-hooks';

import useToggle from './useToggle';

describe('useToggle CSR', () => {
  it('has initial state of false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.on).toBe(false);
  });

  it('can supply custom boolean initial state', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.on).toBe(true);
  });

  it('can toggle state', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.on).toBe(false);

    act(() => result.current.toggle());
    expect(result.current.on).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.on).toBe(false);
  });

  it('can explicity set state to true', () => {
    const { result, rerender } = renderHook(() => useToggle());

    expect(result.current.on).toBe(false);

    act(() => result.current.setOn());
    expect(result.current.on).toBe(true);

    rerender(false);
    expect(result.current.on).toBe(true);

    act(() => result.current.setOn());
    expect(result.current.on).toBe(true);
  });

  it('can explicity set state to false', () => {
    const { result, rerender } = renderHook(() => useToggle(true));

    expect(result.current.on).toBe(true);

    act(() => result.current.setOff());
    expect(result.current.on).toBe(false);

    rerender(true);
    expect(result.current.on).toBe(false);

    act(() => result.current.setOff());
    expect(result.current.on).toBe(false);
  });
});
