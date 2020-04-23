import * as React from 'react';
import usePrefersDarkMode from '@hooky/prefers-dark-mode';
import useLocalStorage from '@hooky/local-storage';

const useDarkMode = (className: string) => {
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode');
  const prefersDarkMode = usePrefersDarkMode();

  const enabled = typeof darkMode !== 'undefined' ? darkMode : prefersDarkMode;

  React.useEffect(() => {
    const { body } = window.document;

    if (enabled) {
      body.classList.add(className);
    } else {
      body.classList.remove(className);
    }
  }, [enabled, className]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
