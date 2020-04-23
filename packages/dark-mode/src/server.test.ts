/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';

import useDarkMode from './useDarkMode';

describe('useDarkMode SSR', () => {
  it('does this', () => {
    const renderedHook = renderHookServer(() => useDarkMode());

    expect(renderedHook).toBeTruthy();
  });
});
