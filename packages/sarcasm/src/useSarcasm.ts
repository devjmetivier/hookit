import * as React from 'react';

export const useSarcasm = () => {
  const sarcasm = React.useCallback((string: string) => {
    let lastAction: 'upper' | 'lower' = 'upper';

    return string
      .split('')
      .map((character: string, i: number) => {
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
