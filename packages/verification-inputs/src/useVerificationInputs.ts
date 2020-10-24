import * as React from 'react';

function handleInput(e: Event) {
  const input = <HTMLInputElement>e.target;

  const next = <HTMLInputElement>input.nextElementSibling;
  const prev = <HTMLInputElement>input.previousElementSibling;

  if (input.value.length > 1) {
    input.value = input.value.charAt(1);
    return;
  }

  if (prev && prev.localName === 'input' && input.value === '') {
    prev.select();
    return;
  }

  if (next && next.localName === 'input' && input.value !== '') {
    next.select();
  }
}

function handleClick(e: MouseEvent) {
  const input = <HTMLInputElement>e.target;
  input.select();
}

function lastInput(focusAfterRef?: React.MutableRefObject<HTMLElement>, lastInputCallback?: () => void) {
  if (lastInputCallback) lastInputCallback();

  if (focusAfterRef) {
    focusAfterRef.current.focus();
  }
}

type Args = {
  focusAfter?: React.MutableRefObject<HTMLElement>;
  lastInputCallback?: () => void;
};

const useVerificationInputs = (options?: Args): [React.MutableRefObject<HTMLInputElement[]>, () => string[]] => {
  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  function getValues() {
    let values: string[] = [];
    inputRefs.current.forEach((input, i) => (values[i] = input.value));

    return values;
  }

  React.useEffect(() => {
    const inputs = inputRefs.current;

    const handleInputCallback = (e: Event) => handleInput(e);
    const handleLastInput = (e: Event) => {
      const input = <HTMLInputElement>e.target;

      if (input.value !== '') {
        lastInput(options.focusAfter, options.lastInputCallback);
      }
    };
    function handlePaste(e: ClipboardEvent) {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').split('');

      inputRefs.current.forEach((input, i) => {
        input.value = pasteData[i] || '';
      });

      if (options.lastInputCallback) options.lastInputCallback();

      if (options.focusAfter) {
        options.focusAfter.current.focus();
        return;
      }

      inputRefs.current[inputRefs.current.length - 1].focus();
    }

    if (inputs.length) {
      inputs.forEach((inputRef) => {
        inputRef.addEventListener('input', handleInputCallback);
        inputRef.addEventListener('click', handleClick);
      });

      inputs[0].addEventListener('paste', handlePaste);
      inputs[inputs.length - 1].addEventListener('input', handleLastInput);
    }

    return () => {
      inputs.forEach((inputRef) => {
        inputRef.removeEventListener('input', handleInputCallback);
        inputRef.addEventListener('click', handleClick);
      });

      inputs[0].removeEventListener('paste', handlePaste);
      inputs[inputs.length - 1].removeEventListener('input', handleLastInput);
    };
  }, [options.focusAfter, options.lastInputCallback]);

  return [inputRefs, getValues];
};

export default useVerificationInputs;
