import * as React from 'react';

const useDarkMode = () => {
  const [state, setState] = React.useState();

  return [state, setState];
};

export default useDarkMode;
