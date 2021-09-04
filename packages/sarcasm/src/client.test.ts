import { renderHook } from '@testing-library/react-hooks';

import { useSarcasm } from './useSarcasm';

describe('useSarcasm CSR', () => {
  it('does sarcasm', () => {
    const { result } = renderHook(() => useSarcasm());

    expect(result.current('so you wanna use some hooks huh???')).toBe('sO yOu WaNnA uSe SoMe HoOkS hUh???');
  });
});
