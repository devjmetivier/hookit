import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { usePermissions, PermissionsProvider, PermissionsType } from './usePermissions';

describe('usePermissions CSR', () => {
  const setup = (rules) =>
    render(
      <PermissionsProvider rules={rules}>
        <p>derp</p>
      </PermissionsProvider>,
    );

  it('does this', () => {
    // const renderedHook = renderHook(() => usePermissions());

    expect(true).toBeTruthy();
  });
});
