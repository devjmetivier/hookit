/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';

import usePrefersDarkMode from './usePrefersDarkMode';

describe('usePrefersDarkMode SSR', () => {
  it('does this', () => {
    const renderedHook = renderHookServer(() => usePrefersDarkMode());

    expect(renderedHook).toBeTruthy();
  });
});
