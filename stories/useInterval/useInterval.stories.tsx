import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useInterval } from '@hookit/interval';

export default {
  title: 'hookit/useInterval',
} as Meta;

export const Default: Story = () => {
  const [state, setState] = React.useState<number | null>(0);

  useInterval(() => setState((prev) => prev + 1), 1000);

  return <p>{state}</p>;
};

export const PauseInterval: Story = () => {
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

const CustomIntervalTemplate: Story<{ customInterval: number }> = ({ customInterval }) => {
  const [state, setState] = React.useState<number | null>(0);
  const [interval, setInterval] = React.useState<number | null>(customInterval);

  useInterval(() => setState((prev) => prev + 1), interval);

  return (
    <>
      <p>{state}</p>
      <button onClick={() => setInterval((prev) => (prev > 0 ? null : customInterval))}>
        {interval ? 'Stop' : 'Start'}
      </button>
    </>
  );
};

export const CustomInterval = CustomIntervalTemplate.bind({});
CustomInterval.args = {
  customInterval: 1000,
};
