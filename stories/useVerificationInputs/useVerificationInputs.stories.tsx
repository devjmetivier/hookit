/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useVerificationInputs from '@hookit/verification-inputs';

export default {
  title: 'hookit/useVerificationInputs',
} as Meta;

const defaultStyles = {
  margin: '0 0.5rem',
  width: 40,
  height: 40,
  textAlign: 'center',
};

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

      {Array.from({ length: 6 }, (_, i) => `item-${i}`).map((item, i) => (
        <input key={item} ref={(input) => (inputRefs.current[i] = input)} style={defaultStyles} type='text' />
      ))}

      <button onClick={() => console.log(getValues())} ref={focusRef} type='button'>
        Get Values
      </button>
    </>
  );
};
