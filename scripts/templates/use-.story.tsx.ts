import { ICliArgs } from '../newPackage';

export default ({ hookName, packageDir }: ICliArgs) => `import * as React from 'react';
import ${hookName} from '@hooky/${packageDir}';

export default {
  title: '${hookName}',
};

export const Default = () => {
  const hookReturn = ${hookName}();

  return (
    <>
      <p>Show off some stuff here.</p>
    </>
  );
};
`;
