import React, { useCallback, useState } from 'react';

import { useElementEventListener } from '@hookit/element-event-listener';
import { useThrottledState } from '@hookit/throttle';
import { useWindowEventListener } from '@hookit/window-event-listener';

type PositionState = { x: number; y: number };
type Return = {
  isNear: boolean;
  isOver: boolean;
};

export const useMouseNear = (
  elementRef: React.MutableRefObject<HTMLElement | undefined>,
  threshold = 20,
  // default to 24fps: 1000 / 24 = 41.66...7
  throttle = 41.67,
): Return => {
  const [, { x, y }, setState] = useThrottledState<PositionState>({ x: null, y: null }, throttle);
  const [isOver, setIsOver] = useState<boolean>(false);

  const isNear = useCallback(() => {
    if (!elementRef.current) return false;

    const left = elementRef.current.offsetLeft - threshold;
    const top = elementRef.current.offsetTop - threshold;
    const right = left + elementRef.current.offsetWidth + 2 * threshold;
    const bottom = top + elementRef.current.offsetHeight + 2 * threshold;

    return x > left && x < right && y > top && y < bottom;
  }, [elementRef, threshold, x, y]);

  const mouseMoveHandler = useCallback((event: MouseEvent) => setState({ x: event.pageX, y: event.pageY }), [setState]);
  const mouseEnterHandler = React.useCallback(() => setIsOver(true), []);
  const mouseLeaveHandler = React.useCallback(() => setIsOver(false), []);

  useWindowEventListener('mousemove', mouseMoveHandler);
  useElementEventListener(elementRef, 'mouseenter', mouseEnterHandler);
  useElementEventListener(elementRef, 'mouseleave', mouseLeaveHandler);

  return { isOver, isNear: isNear() };
};
