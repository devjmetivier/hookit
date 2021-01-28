import * as React from 'react';

type Return = void;

export function useWindowEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => any,
): Return {
  const savedHandler = React.useRef<typeof handler>();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const eventListener = (event: any) => savedHandler.current(event);

    window.addEventListener(eventName, eventListener);

    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName]);
}
