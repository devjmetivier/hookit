import { useThrottledState } from '@hookit/throttle';
import { useWindowEventListener } from '@hookit/window-event-listener';

type PositionState = Partial<Omit<MouseEvent, 'getModifierState' | 'initMouseEvent'>>;

// default to 24fps: 1000 / 24 = 41.66...7
export const useMousePosition = (throttle = 41.67) => {
  const [, throttledValue, setState] = useThrottledState<PositionState>({}, throttle);

  const handler = (event: MouseEvent) => setState(event);

  useWindowEventListener('mousemove', handler);

  return throttledValue;
};
