import { ICliArgs } from '../newPackage';

export default ({ hookName }: ICliArgs) => `/**
 * @jest-environment node
 */

import renderHookServer from '../../../utils/renderHookServer';

import { ${hookName} } from './${hookName}';

describe('${hookName} SSR', () => {
  it('does this', () => {
    // const renderedHook = renderHookServer(() => ${hookName}());

    expect(true).toBeTruthy();
  });
});
`;
