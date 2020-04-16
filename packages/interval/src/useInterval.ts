import * as React from 'react';

type Callback = () => void;
type Interval = number | null;
type Return = void;

/**
 * @param {Callback} callback Executed every time `interval` lapses.
 * @param {Interval} interval? Length of time (milliseconds) before the `callback` is executed. Providing `null` will clear the interval.
 * @returns {Return} nothing
 */
function useInterval(callback: Callback, interval?: Interval): Return {
  const savedCallback = React.useRef<Callback>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (interval !== null) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
}

export default useInterval;
