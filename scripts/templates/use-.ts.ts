import { ICliArgs } from '../newPackage';

export default ({ hookName }: ICliArgs) => `import * as React from 'react';

export const ${hookName} = () => {
  const [state, setState] = React.useState();

  return [state, setState];
};
`;
