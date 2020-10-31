/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';

import useSarcasm from './useSarcasm';

describe('useSarcasm SSR', () => {
  it('does this', () => {
    const renderedHook = renderHookServer(() => useSarcasm());

    expect(renderedHook('so you wanna use some hooks huh???')).toBe('sO yOu WaNnA uSe SoMe HoOkS hUh???');
  });
});
