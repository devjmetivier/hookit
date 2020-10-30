/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';

import useWhyDidYouUpdate from './useWhyDidYouUpdate';

describe('useWhyDidYouUpdate SSR', () => {
  it('returns undefined', () => {
    const renderedHook = renderHookServer(() => useWhyDidYouUpdate('useWhyDidYouUpdate', { example: 0 }));

    expect(renderedHook).toBeFalsy();
  });
});
