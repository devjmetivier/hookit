/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useVerificationInputs from '@hookit/verification-inputs';

export default {
  title: 'hookit/useVerificationInputs',
} as Meta;

const defaultStyles: React.CSSProperties = {
  margin: '0 0.5rem',
  width: 40,
  height: 40,
  textAlign: 'center',
};

const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: -'1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
};

// eslint-disable-next-line react/display-name
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} />);

export const Default: Story = () => {
  const focusRef = React.useRef<HTMLButtonElement | undefined>();

  const [inputRefs, getValues] = useVerificationInputs({
    focusAfter: focusRef,
    lastInputCallback: () => {
      console.log('lastInputCallback executed');
    },
  });

  return (
    <>
      <p>Try copying and pasting these values into the first input:</p>
      <p>123456</p>
      <p>753951</p>
      <p>852456</p>

      {Array.from({ length: 6 }, (_, i) => `input ${i + 1} of 6`).map((item, i) => (
        <>
          <label htmlFor={item} style={srOnly}>
            {item}
          </label>
          <input
            id={item}
            key={item}
            ref={(input) => (inputRefs.current[i] = input)}
            style={defaultStyles}
            type='text'
          />
        </>
      ))}

      <button onClick={() => console.log(getValues())} ref={focusRef} type='button'>
        Get Values
      </button>
    </>
  );
};

export const ForwardRef: Story = () => {
  const focusRef = React.useRef<HTMLButtonElement | undefined>();

  const [inputRefs, getValues] = useVerificationInputs({
    focusAfter: focusRef,
    lastInputCallback: () => {
      console.log('lastInputCallback executed');
    },
  });

  return (
    <>
      <p>Try copying and pasting these values into the first input:</p>
      <p>123456</p>
      <p>753951</p>
      <p>852456</p>

      {Array.from({ length: 6 }, (_, i) => `input ${i + 1} of 6`).map((item, i) => (
        <>
          <label htmlFor={item} style={srOnly}>
            {item}
          </label>
          <InputComponent
            id={item}
            key={item}
            ref={(input) => (inputRefs.current[i] = input)}
            style={defaultStyles}
            type='text'
          />
        </>
      ))}

      <button onClick={() => console.log(getValues())} ref={focusRef} type='button'>
        Get Values
      </button>
    </>
  );
};
