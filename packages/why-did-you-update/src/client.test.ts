import { renderHook } from '@testing-library/react-hooks';

import { useWhyDidYouUpdate, Name, Props } from './useWhyDidYouUpdate';

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

afterEach(() => consoleLogSpy.mockClear());

describe('useWhyDidYouUpdate CSR', () => {
  it('logs updates of arguments to the console', () => {
    const { rerender } = renderHook<{ name: Name; props: Props }, void>(
      ({ name, props }) => useWhyDidYouUpdate(name, props),
      { initialProps: { name: 'useWhyDidYouUpdate', props: { example: 0 } } },
    );

    rerender({ name: 'useWhyDidYouUpdate', props: { example: 1 } });

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('[why-did-you-update]:', 'useWhyDidYouUpdate\n', {
      example: {
        from: 0,
        to: 1,
      },
    });

    rerender({ name: 'useWhyDidYouUpdate', props: { example: 2 } });

    expect(console.log).toBeCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith('[why-did-you-update]:', 'useWhyDidYouUpdate\n', {
      example: {
        from: 1,
        to: 2,
      },
    });

    rerender({ name: 'useWhyDidYouUpdate', props: { example: 3, newProp: 0 } });

    expect(console.log).toBeCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith('[why-did-you-update]:', 'useWhyDidYouUpdate\n', {
      example: {
        from: 2,
        to: 3,
      },
      newProp: {
        from: undefined,
        to: 0,
      },
    });
  });

  it('does not log updates of arguments to the console when props do not change', () => {
    const { rerender } = renderHook<{ name: Name; props: Props }, void>(
      ({ name, props }) => useWhyDidYouUpdate(name, props),
      { initialProps: { name: 'useWhyDidYouUpdate', props: { example: 0 } } },
    );

    rerender({ name: 'useWhyDidYouUpdate', props: { example: 0 } });
    expect(console.log).toBeCalledTimes(0);
  });
});
