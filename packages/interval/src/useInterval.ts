import { useEffect, useRef } from 'react';

type Callback = () => void;
type Interval = number | null;
type Return = void;

/**
 * @param {Callback} callback Executed every time `interval` lapses.
 * @param {Interval} interval? Length of time (milliseconds) before the `callback` is executed. Providing `null` will clear the interval.
 * @returns {Return} nothing
 */
export const useInterval = (callback: Callback, interval: Interval): Return => {
  const savedCallback = useRef<Callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (interval !== null) {
      const id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
};
