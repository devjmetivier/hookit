import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useElementEventListener } from '@hookit/element-event-listener';

export default {
  title: 'hookit/useElementEventListener',
} as Meta;

export const Default: Story = () => {
  // const hookReturn = useElementEventListener();

  return (
    <>
      <p>Show off some stuff here.</p>
    </>
  );
};
