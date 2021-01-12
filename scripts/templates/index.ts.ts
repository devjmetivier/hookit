import { ICliArgs } from '../newPackage';

export default ({ hookName }: ICliArgs) => `export * from './${hookName}';
`;
