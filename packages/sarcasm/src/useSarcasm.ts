import { useCallback } from 'react';

export const useSarcasm = () => {
  const sarcasm = useCallback((string: string) => {
    let lastAction: 'upper' | 'lower' = 'upper';

    return string
      .split('')
      .map((character: string) => {
        if (character === ' ') {
          return character;
        }

        if (lastAction === 'upper') {
          lastAction = 'lower';
          return character.toLocaleLowerCase();
        }

        if (lastAction === 'lower') {
          lastAction = 'upper';
          return character.toLocaleUpperCase();
        }
      })
      .join('');
  }, []);

  return sarcasm;
};
