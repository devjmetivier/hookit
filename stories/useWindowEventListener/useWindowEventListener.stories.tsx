import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useWindowEventListener from '@hookit/window-event-listener';

export default {
  title: 'hookit/useWindowEventListener',
} as Meta;

export const MouseMove: Story = () => {
  const [type, setType] = React.useState<string>('');
  const [x, setX] = React.useState<number>(0);
  const [y, setY] = React.useState<number>(0);

  useWindowEventListener('mousemove', (e) => {
    setType(e.type);
    setX(e.clientX);
    setY(e.clientY);
  });

  return (
    <>
      <p>Try moving your mouse around</p>

      <div>Event type: {type}</div>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </>
  );
};

export const Click: Story = () => {
  const [type, setType] = React.useState<string>('');
  const [x, setX] = React.useState<number>(0);
  const [y, setY] = React.useState<number>(0);

  useWindowEventListener('click', (e) => {
    setType(e.type);
    setX(e.clientX);
    setY(e.clientY);
  });

  useWindowEventListener('dblclick', (e) => {
    setType(e.type);
    setX(e.clientX);
    setY(e.clientY);
  });

  return (
    <>
      <p>Try clicking on the screen</p>

      <div>Event type: {type}</div>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </>
  );
};

export const Keyboard: Story = () => {
  const [type, setType] = React.useState<string>('');
  const [key, setKey] = React.useState<string>('');

  useWindowEventListener('keydown', (e) => {
    setType(e.type);
    setKey(e.key);
  });

  useWindowEventListener('keyup', (e) => {
    setType(e.type);
    setKey(e.key);
  });

  return (
    <>
      <p>Try typing on your keyboard</p>

      <div>Event type: {type}</div>
      <div>key: {key}</div>
    </>
  );
};
