/**
 * @jest-environment node
 */

import * as React from 'react';
import renderHookServer from '../../../utils/renderHookServer';

import { useElementEventListener } from './useElementEventListener';

const event = 'click';
const handler = () => true;

describe('useElementEventListener SSR', () => {
  test('returns undefined', () => {
    const result = renderHookServer(() =>
      useElementEventListener((0 as unknown) as React.MutableRefObject<HTMLDivElement>, event, handler),
    );

    expect(result).toBe(undefined);
  });
});
