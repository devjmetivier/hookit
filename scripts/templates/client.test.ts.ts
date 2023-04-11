import { CliArgs } from '../newPackage';

export default ({ hookName }: CliArgs) => `import { renderHook } from '@testing-library/react-hooks';

import { ${hookName} } from './${hookName}';

describe('${hookName} CSR', () => {
  it('does this', () => {
    // const renderedHook = renderHook(() => ${hookName}());

    expect(true).toBeTruthy();
  });
});
`;
