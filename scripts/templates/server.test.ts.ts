import { CliArgs } from '../newPackage';

export default ({ hookName }: CliArgs) => `/**
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
