import * as React from 'react';
import usePrefersDarkMode from '@hooky/prefers-dark-mode';
import useLocalStorage from '@hooky/local-storage';

type StorageValue = 'dark' | 'light';

const defaultClassName = 'dark-mode';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage<StorageValue>(defaultClassName);
  const prefersDarkMode = usePrefersDarkMode(setDarkMode);

  const enabled = typeof darkMode !== 'undefined' ? darkMode : prefersDarkMode;

  React.useEffect(() => {
    const { body } = window.document;

    enabled === 'dark' ? body.classList.add(defaultClassName) : body.classList.remove(defaultClassName);
  }, [enabled]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
