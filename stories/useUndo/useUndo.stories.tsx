import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useUndo from '@hookit/undo';

export default {
  title: 'hookit/useUndo',
} as Meta;

export const Default: Story = () => {
  const [{ past, present, future }, { canRedo, canUndo, redo, reset, set, undo }] = useUndo<number>(0);

  return (
    <>
      <div
        style={{
          padding: '1rem',
          marginBottom: '2rem',
          height: 250,
          border: '1px solid black',
          overflow: 'auto',
        }}
      >
        <pre>{JSON.stringify({ past, present, future }, null, 2)}</pre>
      </div>

      <div>
        <p>Count: {present}</p>
        <button onClick={() => set(present - 1)} type='button'>
          -1
        </button>
        <button onClick={() => set(present + 1)} type='button'>
          +1
        </button>
      </div>

      <div>
        <button disabled={!canUndo} onClick={undo} type='button'>
          undo
        </button>
        <button disabled={!canRedo} onClick={redo} type='button'>
          redo
        </button>
        <button onClick={() => reset(past[0] || 0)} type='button'>
          reset
        </button>
      </div>
    </>
  );
};
