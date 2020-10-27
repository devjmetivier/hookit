import * as React from 'react';

function handleInput(e: Event, inputs: HTMLInputElement[]) {
  const currentInput = <HTMLInputElement>e.target;

  const nextIndex = inputs.findIndex((input) => input === currentInput) + 1;
  const next = nextIndex >= inputs.length ? null : inputs[nextIndex];

  const prevIndex = inputs.findIndex((input) => input === currentInput) - 1;
  const prev = prevIndex < 0 ? null : inputs[prevIndex];

  if (currentInput.value.length > 1) {
    currentInput.value = currentInput.value.charAt(1);
    return;
  }

  if (prev && prev.localName === 'input' && currentInput.value === '') {
    prev.select();
    return;
  }

  if (next && next.localName === 'input' && currentInput.value !== '') {
    next.select();
  }
}

function handleEmptyBackspace(e: KeyboardEvent, inputs: HTMLInputElement[]) {
  const currentInput = <HTMLInputElement>e.target;

  const prevIndex = inputs.findIndex((input) => input === currentInput) - 1;
  const prev = prevIndex < 0 ? null : inputs[prevIndex];

  if (e.key === 'Backspace' && currentInput.value === '' && prev) {
    prev.select();
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

    inputs.forEach((inputRef) => {
      inputRef.addEventListener('input', (e) => handleInput(e, inputs));
      inputRef.addEventListener('keydown', (e) => handleEmptyBackspace(e, inputs));
      inputRef.addEventListener('click', handleClick);
    });

    inputs[0].addEventListener('paste', handlePaste);
    inputs[inputs.length - 1].addEventListener('input', handleLastInput);

    return () => {
      inputs.forEach((inputRef) => {
        if (inputRef) {
          inputRef.removeEventListener('input', (e) => handleInput(e, inputs));
          inputRef.removeEventListener('keydown', (e) => handleEmptyBackspace(e, inputs));
          inputRef.removeEventListener('click', handleClick);
        }
      });

      inputs[0]?.removeEventListener('paste', handlePaste);
      inputs[inputs.length - 1]?.removeEventListener('input', handleLastInput);
    };
  }, [options]);

  return [inputRefs, getValues];
};

export default useVerificationInputs;
