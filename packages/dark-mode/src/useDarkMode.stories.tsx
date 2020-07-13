import * as React from 'react';
import useDarkMode from '@hooky/dark-mode';

export default {
  title: 'useDarkMode',
};

export const Default = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <>
      <p>Try changing your preferred mode in System Preferences.</p>
      <p>Dark mode? {darkMode ? 'Yes' : 'No'}</p>
    </>
  );
};
