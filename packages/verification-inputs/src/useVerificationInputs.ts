import * as React from 'react';

const useVerificationInputs = () => {
  const [state, setState] = React.useState();

  return [state, setState];
};

export default useVerificationInputs;
