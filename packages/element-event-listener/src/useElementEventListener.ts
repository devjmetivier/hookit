import { useEffect, useRef } from 'react';

type Return = void;

export function useElementEventListener<K extends keyof HTMLElementEventMap>(
  elementRef: React.MutableRefObject<HTMLElement>,
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => any,
): Return {
  const savedHandler = useRef<(event: HTMLElementEventMap[K]) => any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const current = elementRef.current;
    const isSupported = current && current.addEventListener;
    if (!isSupported || !savedHandler.current) return;

    const eventListener = (event: HTMLElementEventMap[K]) => savedHandler.current(event);
    elementRef.current.addEventListener(eventName, eventListener);

    return () => current.removeEventListener(eventName, eventListener);
  }, [eventName, elementRef]);
}
