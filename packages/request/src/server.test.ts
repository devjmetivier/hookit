/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';

import useRequest from './useRequest';

describe('useRequest SSR', () => {
  it('does this', () => {
    const renderedHook = renderHookServer(() => useRequest());

    expect(renderedHook).toBeTruthy();
  });
});
