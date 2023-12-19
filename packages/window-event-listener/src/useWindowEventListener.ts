import { useEffect, useRef } from 'react';

type Return = void;

export function useWindowEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => any,
): Return {
  const savedHandler = useRef<typeof handler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: any) => savedHandler.current(event);

    window.addEventListener(eventName, eventListener);

    return () => window.removeEventListener(eventName, eventListener);
  }, [eventName]);
}
