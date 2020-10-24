/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import useVerificationInputs from '@hooky/verification-inputs';

export default {
  title: 'useVerificationInputs',
};

const defaultStyles = {
  margin: '0 0.5rem',
  width: 40,
  height: 40,
  textAlign: 'center',
};

export const Default = () => {
  const focusRef = React.useRef<HTMLButtonElement | undefined>();
  const [inputRefs, getValues] = useVerificationInputs({
    focusAfter: focusRef,
    lastInputCallback: () => {
      console.log('lastInputCallback executed');
    },
  });

  return (
    <>
      <input ref={(input) => (inputRefs.current[0] = input)} style={defaultStyles} type='text' />
      <input ref={(input) => (inputRefs.current[1] = input)} style={defaultStyles} type='text' />
      <input ref={(input) => (inputRefs.current[2] = input)} style={defaultStyles} type='text' />
      <input ref={(input) => (inputRefs.current[3] = input)} style={defaultStyles} type='text' />
      <input ref={(input) => (inputRefs.current[4] = input)} style={defaultStyles} type='text' />
      <input ref={(input) => (inputRefs.current[5] = input)} style={defaultStyles} type='text' />

      <button onClick={() => console.log(getValues())} ref={focusRef} type='button'>
        Get Values
      </button>
    </>
  );
};

// 123456
// 753951
