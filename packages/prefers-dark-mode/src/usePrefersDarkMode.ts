import * as React from 'react';

type DarkOrLight = 'dark' | 'light';

function usePrefersDarkMode(callback?: any) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const getUserPreference = React.useCallback<() => DarkOrLight>(() => (mq.matches ? 'dark' : 'light'), [mq]);

  const [state, setState] = React.useState(getUserPreference);

  React.useEffect(() => {
    mq.addEventListener('change', () => {
      callback && callback(getUserPreference);
      setState(getUserPreference);
    });

    return () => mq.removeEventListener('change', () => setState(getUserPreference));
  }, [getUserPreference, mq, callback]);

  return state;
}

export default usePrefersDarkMode;
