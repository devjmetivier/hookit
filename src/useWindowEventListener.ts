import * as React from "react";

export function useWindowEventListener(eventName: string, handler) {
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
    // make sure element supports addEventListener
    const isSupported = window && window.addEventListener;
    if (!isSupported) return;

    // create event listener that calls handler function stored in ref
    const eventListener = (event) => savedHandler.current(event);

    // add event listener
    window.addEventListener(eventName, eventListener);

    // remove event listener on cleanup
    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName]);
}
