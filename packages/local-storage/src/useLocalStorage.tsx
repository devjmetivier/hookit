import * as React from 'react';

type Key = string;
type InitialValue<T> = T;
type Return<T> = [T, (value: T) => void];

/**
 * @template T The type of the initial value
 * @param {Key} key The key of the item you want to get from localStorage
 * @param {InitialValue} initialValue The inital value you'd like to return from state. If the key/value exists in storage, it will default to that value over the initial value.
 * @returns {Return}
 */
function useLocalStorage<T>(key: Key, initialValue?: InitialValue<T>): Return<T> {
  // Pass function to useState to determine initial state - this way, logic is only executed once
  const [storedValue, setStoredValue] = React.useState<typeof initialValue>(() => {
    try {
      // Get value from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      if (item) {
        const test = item.match(/^(\[|\{|\d).*(\]|\}|\d)?$/gm);

        if (test && test.length) {
          return JSON.parse(item);
        } else {
          return item;
        }
      } else {
        return initialValue;
      }
    } catch (error) {
      // If error return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = React.useCallback(
    (value: typeof initialValue) => {
      try {
        // Save state
        setStoredValue(value);

        // Save to local storage
        if (typeof value === 'object') {
          window.localStorage.setItem(key, JSON.stringify(value));
        } else {
          window.localStorage.setItem(key, (value as unknown) as string);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key],
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
