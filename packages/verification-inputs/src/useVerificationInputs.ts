import * as React from 'react';

function handleInput(e: Event, inputElements: HTMLInputElement[], options?: Args) {
  const currentInputElement = <HTMLInputElement>e.target;

  const nextIndex = inputElements.findIndex((input) => input === currentInputElement) + 1;
  const next = nextIndex >= inputElements.length ? null : inputElements[nextIndex];
  const nextPlusOne = nextIndex + 1 >= inputElements.length ? null : inputElements[nextIndex + 1];

  const prevIndex = inputElements.findIndex((input) => input === currentInputElement) - 1;
  const prev = prevIndex < 0 ? null : inputElements[prevIndex];

  if (currentInputElement.value.trim().length > 1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    e.clipboardData = {
      getData: () => currentInputElement.value.trim(),
    };
    handlePasteOuter(e as ClipboardEvent, inputElements, options);
    return;
  }

  if (prev && prev.localName === 'input' && currentInputElement.value === '') {
    prev.focus();
    prev.select();
    return;
  }

  if (next && next.localName === 'input' && currentInputElement.value !== '') {
    if (nextPlusOne && nextPlusOne.localName === 'input' && nextPlusOne.value !== '' && options.focusAfter) {
      options.focusAfter.current.focus();
      return;
    }

    next.focus();
    next.select();
    return;
  }
}

function handlePasteOuter(e: ClipboardEvent, inputElements: HTMLInputElement[], options?: Args) {
  e.preventDefault();
  const pasteData = e.clipboardData.getData('text').split('');

  inputElements.forEach((input, i) => {
    input.value = pasteData[i] || '';
  });

  if (options.lastInputCallback) options.lastInputCallback();

  if (options.focusAfter) {
    options.focusAfter.current.focus();
    return;
  }

  inputElements[inputElements.length - 1].focus();
}

function handleEmptyBackspace(e: KeyboardEvent, inputs: HTMLInputElement[]) {
  const currentInput = <HTMLInputElement>e.target;

  const prevIndex = inputs.findIndex((input) => input === currentInput) - 1;
  const prev = prevIndex < 0 ? null : inputs[prevIndex];

  if (e.key === 'Backspace' && currentInput.value === '' && prev) {
    prev.focus();
    prev.select();
  }
}

function handleClick(e: MouseEvent) {
  const input = <HTMLInputElement>e.target;
  input.focus();
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
  shouldFocusFirstInput?: boolean;
};

export const useVerificationInputs = (options?: Args): [React.MutableRefObject<HTMLInputElement[]>, () => string[]] => {
  const inputElementRefs = React.useRef<HTMLInputElement[]>([]);

  function getValues() {
    const values: string[] = [];
    inputElementRefs.current.forEach((input, i) => (values[i] = input.value));

    return values;
  }

  const handlePasteInner = React.useCallback(
    (e: ClipboardEvent) => handlePasteOuter(e, inputElementRefs.current, options),
    [options],
  );

  React.useEffect(() => {
    if (options?.shouldFocusFirstInput) {
      inputElementRefs.current[0].focus();
    }
  }, [options?.shouldFocusFirstInput]);

  React.useEffect(() => {
    const inputElements = inputElementRefs.current;

    const handleLastInput = (e: Event) => {
      const input = <HTMLInputElement>e.target;

      if (input.value !== '') {
        lastInput(options.focusAfter, options.lastInputCallback);
      }
    };

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', (e) => handleInput(e, inputElements, options));
      inputElement.addEventListener('keydown', (e) => handleEmptyBackspace(e, inputElements));
      inputElement.addEventListener('click', handleClick);
    });

    inputElements[0].addEventListener('paste', handlePasteInner);
    inputElements[inputElements.length - 1].addEventListener('input', handleLastInput);

    return () => {
      inputElements.forEach((inputElement) => {
        if (inputElement) {
          inputElement.removeEventListener('input', (e) => handleInput(e, inputElements, options));
          inputElement.removeEventListener('keydown', (e) => handleEmptyBackspace(e, inputElements));
          inputElement.removeEventListener('click', handleClick);
        }
      });

      inputElements[0]?.removeEventListener('paste', handlePasteInner);
      inputElements[inputElements.length - 1]?.removeEventListener('input', handleLastInput);
    };
  }, [handlePasteInner, options]);

  return [inputElementRefs, getValues];
};
