/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-for */
import * as React from 'react';

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useVerificationInputs } from './useVerificationInputs';

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

afterEach(() => consoleLogSpy.mockClear());

const Component: React.FC<{ options?: boolean }> = ({ options }) => {
  const focusRef = React.useRef<HTMLButtonElement | undefined>();
  const [inputRefs, getValues] = useVerificationInputs(
    options ? { focusAfter: focusRef, lastInputCallback: () => console.log('lastInputCallback') } : {},
  );

  return (
    <>
      {Array.from({ length: 6 }, (_, i) => `input ${i + 1} of 6`).map((item, i) => (
        <React.Fragment key={item}>
          <label data-testid='input-label' htmlFor={item}>
            {item}
          </label>
          <input data-testid='input' id={item} ref={(input) => (inputRefs.current[i] = input)} type='text' />
        </React.Fragment>
      ))}

      <button data-testid='button' onClick={() => console.log(getValues())} ref={focusRef} type='button'>
        Get Values
      </button>
    </>
  );
};

describe('useVerificationInputs CSR', () => {
  const setup = (enableOptions?: boolean) => render(<Component options={enableOptions} />);

  it('behaves normally without options', () => {
    const { getAllByTestId, rerender } = setup();
    const [input1, input2, input3, input4, input5, input6] = getAllByTestId('input');

    userEvent.type(input1, '1');
    expect(input2).toHaveFocus();

    userEvent.type(input2, '2');
    expect(input3).toHaveFocus();

    userEvent.type(input3, '3');
    expect(input4).toHaveFocus();

    userEvent.type(input4, '4');
    expect(input5).toHaveFocus();

    userEvent.type(input5, '5');
    expect(input6).toHaveFocus();

    userEvent.type(input6, '6');
    expect(input6).toHaveFocus();

    userEvent.type(input6, '{backspace}}');
    expect(input5).toHaveFocus();

    userEvent.type(input5, '{backspace}}');
    expect(input4).toHaveFocus();

    userEvent.type(input4, '{backspace}}');
    expect(input3).toHaveFocus();

    userEvent.type(input3, '{backspace}}');
    expect(input2).toHaveFocus();

    userEvent.type(input2, '{backspace}}');
    expect(input1).toHaveFocus();

    userEvent.type(input1, '');
    expect(input1).toHaveFocus();

    rerender(<Component />);
  });

  it('behaves normally with options', () => {
    const { getAllByTestId } = setup(true);
    const [input1, input2, input3, input4, input5, input6] = getAllByTestId('input');
    const [button] = getAllByTestId('button');

    userEvent.type(input1, '1');
    expect(input2).toHaveFocus();

    userEvent.type(input2, '2');
    expect(input3).toHaveFocus();

    userEvent.type(input3, '3');
    expect(input4).toHaveFocus();

    userEvent.type(input4, '4');
    expect(input5).toHaveFocus();

    userEvent.type(input5, '5');
    expect(input6).toHaveFocus();

    userEvent.type(input6, '6');
    expect(button).toHaveFocus();

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('lastInputCallback');

    userEvent.click(button);
    expect(console.log).toBeCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(['1', '2', '3', '4', '5', '6']);
  });

  it('behaves normally when inputs are empty', () => {
    const { getAllByTestId } = setup(true);
    const [input1, input2, input3, input4, input5, input6] = getAllByTestId('input');

    fireEvent.keyDown(input6, { key: 'Backspace' });
    expect(input5).toHaveFocus();

    fireEvent.keyDown(input5, { key: 'Backspace' });
    expect(input4).toHaveFocus();

    fireEvent.keyDown(input4, { key: 'Backspace' });
    expect(input3).toHaveFocus();

    fireEvent.keyDown(input3, { key: 'Backspace' });
    expect(input2).toHaveFocus();

    fireEvent.keyDown(input2, { key: 'Backspace' });
    expect(input1).toHaveFocus();

    fireEvent.keyDown(input1, { key: 'Backspace' });
    expect(input1).toHaveFocus();
  });

  it('behaves normally when first input is pasted into without options', () => {
    const { getAllByTestId } = setup();
    const [input1, input2, input3, input4, input5, input6] = getAllByTestId('input');

    fireEvent.paste(input1, { clipboardData: { getData: () => '123456' } });

    expect(input1).toHaveValue('1');
    expect(input2).toHaveValue('2');
    expect(input3).toHaveValue('3');
    expect(input4).toHaveValue('4');
    expect(input5).toHaveValue('5');
    expect(input6).toHaveValue('6');

    expect(input6).toHaveFocus();
  });

  it('behaves normally when first input is pasted into without options', () => {
    const { getAllByTestId } = setup(true);
    const [input1, input2, input3, input4, input5, input6] = getAllByTestId('input');
    const [button] = getAllByTestId('button');

    fireEvent.paste(input1, { clipboardData: { getData: () => '123456' } });

    expect(input1).toHaveValue('1');
    expect(input2).toHaveValue('2');
    expect(input3).toHaveValue('3');
    expect(input4).toHaveValue('4');
    expect(input5).toHaveValue('5');
    expect(input6).toHaveValue('6');

    expect(button).toHaveFocus();
  });

  it('behaves normally when first input is pasted into but clipboard data is insufficient', () => {
    const { getAllByTestId } = setup();
    const [input1, input2, input3, input4, input5, input6] = getAllByTestId('input');

    fireEvent.paste(input1, { clipboardData: { getData: () => '123' } });

    expect(input1).toHaveValue('1');
    expect(input2).toHaveValue('2');
    expect(input3).toHaveValue('3');
    expect(input4).toHaveValue('');
    expect(input5).toHaveValue('');
    expect(input6).toHaveValue('');

    expect(input6).toHaveFocus();
  });
});
