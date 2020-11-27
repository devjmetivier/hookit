import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useToggle from '@hookit/toggle';

export default {
  title: 'hookit/useToggle',
} as Meta;

export const Default: Story = () => {
  const { on, toggle, setOn, setOff } = useToggle(false);

  return (
    <>
      <p>State: {on ? 'on' : 'off'}</p>

      <div>
        <button onClick={() => toggle()} type='button'>
          toggle
        </button>
        <button onClick={() => setOn()} type='button'>
          set on
        </button>
        <button onClick={() => setOff()} type='button'>
          set off
        </button>
      </div>
    </>
  );
};
