import { ICliArgs } from '../newPackage';

export default ({ hookName }: ICliArgs) => `export { default } from './${hookName}';
`;
