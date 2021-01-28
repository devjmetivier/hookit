import * as React from 'react';
import { css } from '@emotion/css';
import { ArgTypes, Meta, Story } from '@storybook/react/types-6-0';
import { useMouseNear, useMousePosition } from '@hookit/mouse';

export default { title: 'hookit/useMouse' } as Meta;

export const MouseNear: Story = ({ threshold, throttle }) => {
  const ref = React.useRef();
  const { isNear, isOver } = useMouseNear(ref, threshold, throttle);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
      }}
    >
      <p style={{ marginBottom: threshold + 8 }}>Try bringing your mouse closer to the red bounding box</p>

      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin: 0 auto;
          width: 200px;
          height: 200px;
          text-align: center;
          background: black;
          color: white;
          &:before {
            content: '';
            position: absolute;
            width: calc(200px + ${threshold}px * 2);
            height: calc(200px + ${threshold}px * 2);
            top: calc(0 - ${threshold}px * 2);
            left: calc(0 - ${threshold}px * 2);
            background: red;
            z-index: -1;
          }
        `}
        ref={ref}
      >
        isNear: {isNear ? 'yes' : 'no'}
        <br />
        isOver: {isOver ? 'yes' : 'no'}
      </div>
    </div>
  );
};

MouseNear.argTypes = {
  threshold: {
    defaultValue: 20,
    control: {
      type: 'number',
    },
  },
  throttle: {
    defaultValue: 41.67,
    control: {
      type: 'number',
    },
  },
} as ArgTypes;

export const MousePosition: Story = ({ throttle }) => {
  const { x, y } = useMousePosition(throttle);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
      }}
    >
      <p>x: {x}</p>
      <p>y: {y}</p>
    </div>
  );
};

MousePosition.argTypes = {
  throttle: {
    defaultValue: 41.67,
    control: {
      type: 'number',
    },
  },
} as ArgTypes;

const MouseNearComp = () => {
  const ref = React.useRef();
  const { isNear, isOver } = useMouseNear(ref);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: 100,
        height: 100,
        background: isOver ? 'green' : isNear ? 'yellow' : 'transparent',
        border: '2px solid black',
      }}
    >
      isNear: {isNear ? 'yes' : 'no'}
      <br />
      isOver: {isOver ? 'yes' : 'no'}
    </div>
  );
};

const arr = Array.from(new Array(100), (_, i) => `arr=${i}`);

export const StressTest: Story = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
      {arr.map((item) => (
        <MouseNearComp key={item} />
      ))}
    </div>
  );
};
