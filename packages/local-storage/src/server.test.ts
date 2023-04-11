/**
 * @jest-environment node
 */

import { consoleError } from '../../../mocks/console';
import renderHookServer from '../../../utils/renderHookServer';

import { useLocalStorage } from './useLocalStorage';

const key = 'key';
const initialValue = 'Hello, Moto!';

describe('useLocalStorage SSR', () => {
  it('handles errors', () => {
    const result = renderHookServer(() => useLocalStorage(key, initialValue));

    expect(result[0]).toBe(initialValue);

    result[1]('something else');

    expect(result[0]).toBe(initialValue);
    expect(consoleError).toHaveBeenCalledTimes(1);
  });
});
