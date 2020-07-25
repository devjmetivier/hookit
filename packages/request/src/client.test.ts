import { renderHook } from '@testing-library/react-hooks';

import useRequest from './useRequest';

describe('useRequest CSR', () => {
  it('does this', () => {
    const renderedHook = renderHook(() => useRequest());

    expect(renderedHook).toBeTruthy();
  });
});
