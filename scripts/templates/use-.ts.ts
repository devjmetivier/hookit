import { CliArgs } from '../newPackage';

export default ({ hookName }: CliArgs) => `import * as React from 'react';

export const ${hookName} = () => {
  const [state, setState] = React.useState();

  return [state, setState];
};
`;
