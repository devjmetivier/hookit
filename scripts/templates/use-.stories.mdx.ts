import { ICliArgs } from '../newPackage';

export default ({ hookName, description }: ICliArgs) => `import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="hookit/${hookName}/Docs" />

# ${hookName}

${description}
`;
