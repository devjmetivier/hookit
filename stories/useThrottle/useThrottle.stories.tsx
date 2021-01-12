/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { ArgTypes, Meta, Story } from '@storybook/react/types-6-0';
import { useThrottle, useThrottledState } from '@hookit/throttle';

export default { title: 'hookit/useThrottle' } as Meta;

export const Throttle: Story<{ delay: number }> = ({ delay }) => {
  const [state, setState] = React.useState('');
  const throttledValue = useThrottle(state, delay);

  return (
    <>
      <input onChange={(e) => setState(e.target.value)} type='text' />

      <p>Delay: {delay}</p>

      <p>State: {state}</p>
      <p>Throttled Value: {throttledValue}</p>
    </>
  );
};

Throttle.argTypes = {
  delay: {
    defaultValue: 1000,
    control: {
      type: 'number',
    },
  },
} as ArgTypes;

export const ThrottledState: Story<{ delay: number }> = ({ delay }) => {
  const [state, throttledValue, setState] = useThrottledState('', delay);

  return (
    <>
      <input onChange={(e) => setState(e.target.value)} type='text' />

      <p>Delay: {delay}</p>

      <p>State: {state}</p>
      <p>Debounced Value: {throttledValue}</p>
    </>
  );
};

ThrottledState.argTypes = {
  delay: {
    defaultValue: 1000,
    control: {
      type: 'number',
    },
  },
} as ArgTypes;
