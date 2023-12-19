/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';
import { useWindowEventListener } from './useWindowEventListener';

const event = 'languagechange';
const handler = () => true;

describe('useWindowEventListener SSR', () => {
  test('returns undefined', () => {
    const result = renderHookServer(() => useWindowEventListener(event, handler));

    expect(result).toBe(undefined);
  });
});
