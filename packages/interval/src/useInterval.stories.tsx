import * as React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import useInterval from '@hooky/interval';

export default {
  title: 'useInterval',
  decorators: [withKnobs],
};

export const Default: React.FC = () => {
  const [state, setState] = React.useState<number | null>(0);

  useInterval(() => setState((prev) => prev + 1), 1000);

  return <p>{state}</p>;
};

export const PauseInterval: React.FC = () => {
  const [state, setState] = React.useState<number | null>(0);
  const [interval, setInterval] = React.useState<boolean | null>(true);

  useInterval(() => setState((prev) => prev + 1), interval ? 1000 : null);

  return (
    <>
      <p>{state}</p>
      <button onClick={() => setInterval((prev) => !prev)}>{interval ? 'Stop' : 'Start'}</button>
    </>
  );
};

export const CustomInterval: React.FC = () => {
  const [state, setState] = React.useState<number | null>(0);
  const [interval, setInterval] = React.useState<number | null>(number('Interval', 1000));

  useInterval(() => setState((prev) => prev + 1), interval);

  return (
    <>
      <p>{state}</p>
      <button onClick={() => setInterval((prev) => (prev > 0 ? null : number('Interval', 1000)))}>
        {interval ? 'Stop' : 'Start'}
      </button>
    </>
  );
};
