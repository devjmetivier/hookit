import * as React from 'react';
import useWindowEventListener from '@hooky/window-event-listener';

export default {
  title: 'useWindowEventListener',
};

export const Default: React.FC = () => {
  const [x, setX] = React.useState<number>(0);
  const [y, setY] = React.useState<number>(0);

  useWindowEventListener('mousemove', (e) => {
    setX(e.clientX);
    setY(e.clientY);
  });

  return (
    <>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </>
  );
};
