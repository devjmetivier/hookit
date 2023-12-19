import { act, renderHook } from '@testing-library/react-hooks';

import { useUndo } from './useUndo';

describe('useUndo CSR', () => {
  it('sets initial state', () => {
    const { result } = renderHook(() => useUndo(0));
    const [{ past, present, future }] = result.current;

    expect(past).toHaveLength(0);
    expect(present).toBe(0);
    expect(future).toHaveLength(0);
  });

  it('sets new state', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].set(result.current[0].present + 1));

    expect(result.current[0].past).toHaveLength(1);
    expect(result.current[0].present).toBe(1);
    expect(result.current[0].future).toHaveLength(0);
  });

  it('does not set new state when argument of `set` is equal to `present`', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present));

    expect(result.current[0].past).toHaveLength(1);
    expect(result.current[0].present).toBe(1);
    expect(result.current[0].future).toHaveLength(0);
  });

  it('can undo state', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].undo());

    expect(result.current[0].past).toHaveLength(1);
    expect(result.current[0].present).toBe(1);
    expect(result.current[0].future).toHaveLength(1);
  });

  it('can not undo state when past state is unavailable', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].undo());

    expect(result.current[0].past).toHaveLength(0);
    expect(result.current[0].present).toBe(0);
    expect(result.current[0].future).toHaveLength(0);
  });

  it('can redo state', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].undo());
    act(() => result.current[1].redo());

    expect(result.current[0].past).toHaveLength(1);
    expect(result.current[0].present).toBe(1);
    expect(result.current[0].future).toHaveLength(0);
  });

  it('can not redo state when past state is unavailable', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].redo());

    expect(result.current[0].past).toHaveLength(0);
    expect(result.current[0].present).toBe(0);
    expect(result.current[0].future).toHaveLength(0);
  });

  it('can reset state', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].reset(0));

    expect(result.current[0].past).toHaveLength(0);
    expect(result.current[0].present).toBe(0);
    expect(result.current[0].future).toHaveLength(0);
  });

  it('can reset state to first indice of `past`', () => {
    const { result } = renderHook(() => useUndo(0));

    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].set(result.current[0].present + 1));
    act(() => result.current[1].reset(result.current[0].past.length ? result.current[0].past[0] : 15));

    expect(result.current[0].past).toHaveLength(0);
    expect(result.current[0].present).toBe(0);
    expect(result.current[0].future).toHaveLength(0);
  });

  it('properly handles boolean controls', () => {
    const { result } = renderHook(() => useUndo(0));

    expect(result.current[1].canUndo).toBeFalsy();
    expect(result.current[1].canRedo).toBeFalsy();

    act(() => result.current[1].set(result.current[0].present + 1));

    expect(result.current[1].canUndo).toBeTruthy();
    expect(result.current[1].canRedo).toBeFalsy();

    act(() => result.current[1].undo());

    expect(result.current[1].canUndo).toBeFalsy();
    expect(result.current[1].canRedo).toBeTruthy();
  });
});
