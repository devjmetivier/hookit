import * as React from 'react';

type Return = void;

/**
 * @param {EventName} eventName One of the events supported by `window`
 * @param {Handler} handler Callback that is executed when event is triggered. The Event data is accessible as a default param in the callback.
 * @returns {Return} nothing
 */
function useWindowEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => any,
): Return {
  // create a ref that stores handler
  const savedHandler = React.useRef<typeof handler>();

  // update ref.current value if handler changes.
  // this allows our effect below to always get latest handler
  // without us needing to pass it in effect deps array
  // and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    // create event listener that calls handler function stored in ref
    const eventListener = (event: any) => savedHandler.current(event);

    // add event listener
    window.addEventListener(eventName, eventListener);

    // remove event listener on cleanup
    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName]);
}

export default useWindowEventListener;
