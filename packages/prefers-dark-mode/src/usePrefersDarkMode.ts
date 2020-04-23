import * as React from 'react';

const usePrefersDarkMode = () => {
  const getUserPreference = React.useCallback(() => window.matchMedia('(prefers-color-scheme: dark)').matches, []);

  const [state] = React.useState(getUserPreference);

  return state;
};

export default usePrefersDarkMode;
