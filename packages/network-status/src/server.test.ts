/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';
import useNetworkStatus from './useNetworkStatus';

describe('useNetworkStatus SSR', () => {
  test('returns undefined', () => {
    const result = renderHookServer(() => useNetworkStatus());

    expect(result).toEqual(undefined);
  });
});
