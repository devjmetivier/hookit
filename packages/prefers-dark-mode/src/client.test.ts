import { renderHook } from '@testing-library/react-hooks';

import usePrefersDarkMode from './usePrefersDarkMode';

describe('usePrefersDarkMode CSR', () => {
  it('does this', () => {
    const renderedHook = renderHook(() => usePrefersDarkMode());

    expect(renderedHook).toBeTruthy();
  });
});
