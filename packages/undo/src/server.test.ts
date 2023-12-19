/**
 * @jest-environment node
 */

import { act } from '@testing-library/react-hooks';

import renderHookServer from '../../../utils/renderHookServer';
import { useUndo } from './useUndo';

describe('useUndo SSR', () => {
  it('sets initial state', () => {
    const renderedHook = renderHookServer(() => useUndo(0));
    const [{ past, present, future }] = renderedHook;

    expect(past).toHaveLength(0);
    expect(present).toBe(0);
    expect(future).toHaveLength(0);
  });

  it('sets new state', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].set(renderedHook[0].present + 1));

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('does not set new state when argument of `set` is equal to `present`', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present));

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('can undo state', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].undo());

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('can not undo state when past state is unavailable', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].undo());

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('can redo state', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].undo());
    act(() => renderedHook[1].redo());

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('can not redo state when past state is unavailable', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].undo());
    act(() => renderedHook[1].redo());

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('can reset state', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].reset(0));

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('can reset state to first indice of `past`', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].set(renderedHook[0].present + 1));
    act(() => renderedHook[1].reset(renderedHook[0].past.length ? renderedHook[0].past[0] : 15));

    expect(renderedHook[0].past).toHaveLength(0);
    expect(renderedHook[0].present).toBe(0);
    expect(renderedHook[0].future).toHaveLength(0);
  });

  it('properly handles boolean controls', () => {
    const renderedHook = renderHookServer(() => useUndo(0));

    expect(renderedHook[1].canUndo).toBeFalsy();
    expect(renderedHook[1].canRedo).toBeFalsy();

    act(() => renderedHook[1].set(renderedHook[0].present + 1));

    expect(renderedHook[1].canUndo).toBeFalsy();
    expect(renderedHook[1].canRedo).toBeFalsy();

    act(() => renderedHook[1].undo());

    expect(renderedHook[1].canUndo).toBeFalsy();
    expect(renderedHook[1].canRedo).toBeFalsy();
  });
});
