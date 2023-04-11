import { CliArgs } from '../newPackage';

export default ({ hookName }: CliArgs) => `export * from './${hookName}';
`;
