import * as React from 'react';

type DarkOrLight = 'dark' | 'light';

function usePrefersDarkMode(callback?: any) {
  let mq: MediaQueryList;

  if (typeof window !== 'undefined') {
    mq = window.matchMedia('(prefers-color-scheme: dark)');
  } else {
    mq = undefined;
  }

  const getUserPreference = React.useCallback<() => DarkOrLight>(
    () => (mq ? (mq.matches ? 'dark' : 'light') : 'light'),
    [mq],
  );

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
