/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { useVerificationInputs } from '@hookit/verification-inputs';

const UseVerificationInputsPage = () => {
  const focusRef = React.useRef<HTMLElement>(null) as React.MutableRefObject<HTMLButtonElement>;

  const [inputRefs, getValues] = useVerificationInputs({
    focusAfter: focusRef,
    lastInputCallback: () => {
      console.log('lastInputCallback executed');
    },
    shouldFocusFirstInput: true,
  });

  return (
    <div>
      <h1>useVerificationInputs</h1>

      <div>
        {Array.from({ length: 6 }, (_, i) => `item-${i}`).map((item, i) => (
          <input
            inputMode='numeric'
            key={item}
            pattern='[0-9]*'
            ref={(input) => (inputRefs.current[i] = input as HTMLInputElement)}
            required
            style={{ width: 40, height: 40, marginRight: 10, border: '1px solid gray', borderRadius: 4 }}
            type='number'
          />
        ))}
      </div>

      <div>
        <button onClick={() => console.log(getValues())} ref={focusRef} type='button'>
          Get Values
        </button>
      </div>
    </div>
  );
};

export default UseVerificationInputsPage;
