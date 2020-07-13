import * as React from 'react';
import usePrefersDarkMode from '@hooky/prefers-dark-mode';

export default {
  title: 'usePrefersDarkMode',
};

export const Default = () => {
  const prefersDarkMode = usePrefersDarkMode();

  return (
    <>
      <p>Try changing your preferred mode in System Preferences.</p>
      <p>Prefers dark mode? {prefersDarkMode ? 'Yes' : 'No'}</p>
    </>
  );
};
