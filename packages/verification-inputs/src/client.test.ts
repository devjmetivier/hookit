import { renderHook } from '@testing-library/react-hooks';

import useVerificationInputs from './useVerificationInputs';

describe('useVerificationInputs CSR', () => {
  it('does this', () => {
    const renderedHook = renderHook(() => useVerificationInputs());

    expect(renderedHook).toBeTruthy();
  });
});
