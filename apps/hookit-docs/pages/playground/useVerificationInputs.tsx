import * as React from 'react';

import { useVerificationInputs } from '@hookit/verification-inputs';

const UseVerificationInputsPage = () => {
  const [results, setResults] = React.useState<string[]>();
  const resetButtonRef = React.useRef<HTMLElement>(null) as React.MutableRefObject<HTMLButtonElement>;

  const [inputRefs, getValues] = useVerificationInputs({
    focusAfter: resetButtonRef,
    lastInputCallback: () => {
      setResults(getValues());
    },
    shouldFocusFirstInput: true,
  });

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>useVerificationInputs</h1>

      <div style={{ marginBottom: 12 }}>
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

      {results && (
        <div style={{ marginBottom: 12 }}>
          <pre>Array: {JSON.stringify(results, null)}</pre>
          <pre>String: {results?.join('')}</pre>
        </div>
      )}

      <div>
        <button ref={resetButtonRef} onClick={() => window.location.reload()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default UseVerificationInputsPage;
