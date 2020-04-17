import * as React from 'react';
import useWindowEventListener from '@hooky/window-event-listener';

export default {
  title: 'useWindowEventListener',
};

export const MouseMove: React.FC = () => {
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
      <div>event type: {type}</div>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </>
  );
};

export const Click: React.FC = () => {
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
      <div>event type: {type}</div>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </>
  );
};

export const Keyboard: React.FC = () => {
  const [type, setType] = React.useState<string>('');
  const [key, setKey] = React.useState<string>('');

  useWindowEventListener('keydown', (e) => {
    setType(e.type);
    setKey(e.code);
  });

  useWindowEventListener('keyup', (e) => {
    setType(e.type);
    setKey(e.code);
  });

  return (
    <>
      <div>event type: {type}</div>
      <div>code: {key}</div>
    </>
  );
};
