/**
 * @jest-environment node
 */

import { act } from '@testing-library/react-hooks';

import renderHookServer from '../../../utils/renderHookServer';
import { useToggle } from './useToggle';

describe('useToggle SSR', () => {
  it('has initial state of false', () => {
    const renderedHook = renderHookServer(() => useToggle());

    expect(renderedHook.on).toBe(false);
  });

  it('can supply custom boolean initial state', () => {
    const renderedHook = renderHookServer(() => useToggle(true));

    expect(renderedHook.on).toBe(true);
  });

  it('can toggle state', () => {
    const renderedHook = renderHookServer(() => useToggle());

    expect(renderedHook.on).toBe(false);

    act(() => renderedHook.toggle());
    expect(renderedHook.on).toBe(false);

    act(() => renderedHook.toggle());
    expect(renderedHook.on).toBe(false);
  });

  it('can explicity set state to true', () => {
    const renderedHook = renderHookServer(() => useToggle());

    expect(renderedHook.on).toBe(false);

    act(() => renderedHook.setOn());
    expect(renderedHook.on).toBe(false);

    act(() => renderedHook.setOn());
    expect(renderedHook.on).toBe(false);
  });

  it('can explicity set state to false', () => {
    const renderedHook = renderHookServer(() => useToggle(true));

    expect(renderedHook.on).toBe(true);

    act(() => renderedHook.setOff());
    expect(renderedHook.on).toBe(true);

    act(() => renderedHook.setOff());
    expect(renderedHook.on).toBe(true);
  });
});
