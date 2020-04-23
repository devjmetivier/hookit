import { renderHook } from '@testing-library/react-hooks';

import useDarkMode from './useDarkMode';

describe('useDarkMode CSR', () => {
  it('does this', () => {
    const renderedHook = renderHook(() => useDarkMode());

    expect(renderedHook).toBeTruthy();
  });
});
