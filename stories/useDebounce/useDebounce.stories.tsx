/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { ArgTypes, Meta, Story } from '@storybook/react/types-6-0';
import { useDebounce, useDebouncedState } from '@hookit/debounce';

export default { title: 'hookit/useDebounce' } as Meta;

export const Debounce: Story<{ delay: number }> = ({ delay }) => {
  const [state, setState] = React.useState('');
  const debouncedValue = useDebounce(state, delay);

  return (
    <>
      <input onChange={(e) => setState(e.target.value)} type='text' />

      <p>Delay: {delay}</p>

      <p>State: {state}</p>
      <p>Debounced Value: {debouncedValue}</p>
    </>
  );
};

Debounce.argTypes = {
  delay: {
    defaultValue: 1000,
    control: {
      type: 'number',
    },
  },
} as ArgTypes;

export const DebouncedState: Story<{ delay: number }> = ({ delay }) => {
  const [state, debouncedValue, setState] = useDebouncedState('', delay);

  return (
    <>
      <input onChange={(e) => setState(e.target.value)} type='text' />

      <p>Delay: {delay}</p>

      <p>State: {state}</p>
      <p>Debounced Value: {debouncedValue}</p>
    </>
  );
};

DebouncedState.argTypes = {
  delay: {
    defaultValue: 1000,
    control: {
      type: 'number',
    },
  },
} as ArgTypes;
