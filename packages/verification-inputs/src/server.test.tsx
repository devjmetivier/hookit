/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';
import { useVerificationInputs } from './useVerificationInputs';

describe('useVerificationInputs SSR', () => {
  it('returns proper elements from hook', () => {
    const renderedHook = renderHookServer(() => useVerificationInputs());

    expect(renderedHook[0].current).toHaveLength(0);
    expect(typeof renderedHook[1]).toBe('function');
  });
});
