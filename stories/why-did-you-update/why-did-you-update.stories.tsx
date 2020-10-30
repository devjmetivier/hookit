import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useWhyDidYouUpdate from '@hookit/why-did-you-update';

export default {
  title: 'hookit/useWhyDidYouUpdate',
} as Meta;

const WhyDidYouUpdate = (props: any) => {
  useWhyDidYouUpdate('UpdateProps', props);

  return (
    <>
      <p>Have a look at the console after clicking the button</p>
    </>
  );
};

export const UpdateProps: Story = () => {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <WhyDidYouUpdate count={count} />
      <code>
        <pre>Props: {JSON.stringify({ count }, null, 2)}</pre>
      </code>
      <button onClick={() => setCount((prev) => prev + 1)} type='button'>
        Click {count}
      </button>
    </>
  );
};

export const UpdateState: Story = () => {
  const [count, setCount] = React.useState(0);

  useWhyDidYouUpdate('UpdateState', { count });

  return (
    <>
      <p>Have a look at the console after clicking the button</p>
      <code>
        <pre>State: {JSON.stringify({ count }, null, 2)}</pre>
      </code>
      <button onClick={() => setCount((prev) => prev + 1)} type='button'>
        Click {count}
      </button>
    </>
  );
};
