import * as React from 'react';

type EventName = keyof WindowEventMap;
type Handler = (event: Event) => any;
type Return = void;

function useWindowEventListener(eventName: EventName, handler: Handler): Return {
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
    const eventListener = (event: Event) => savedHandler.current(event);

    // add event listener
    window.addEventListener(eventName, eventListener);

    // remove event listener on cleanup
    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName]);
}

export default useWindowEventListener;
