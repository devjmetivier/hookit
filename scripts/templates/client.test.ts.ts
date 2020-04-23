import { ICliArgs } from '../newPackage';

export default ({ hookName }: ICliArgs) => `import { renderHook } from '@testing-library/react-hooks';

import ${hookName} from './${hookName}';

describe('${hookName} CSR', () => {
  it('does this', () => {
    const renderedHook = renderHook(() => ${hookName}());

    expect(renderedHook).toBeTruthy();
  });
});
`;
