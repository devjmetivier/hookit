/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';

import useMedia from './useMedia';

const mq = ['(min-width: 1000px)', '(min-width: 500px)', '(min-width: 250px)'];
const mqValues = [3, 2, 1];
const mqDefault = 0;

describe('useMedia SSR', () => {
  it('returns default value when server rendered', () => {
    const renderedHook = renderHookServer(() => useMedia(mq, mqValues, mqDefault));

    expect(renderedHook).toBe(mqDefault);
  });
});
