import { ICliArgs } from '../newPackage';

export default ({ hookName, packageDir }: ICliArgs) => `import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ${hookName} from '@hookit/${packageDir}';

export default {
  title: 'hookit/${hookName}',
} as Meta;

export const Default: Story = () => {
  // const hookReturn = ${hookName}();

  return (
    <>
      <p>Show off some stuff here.</p>
    </>
  );
};
`;
