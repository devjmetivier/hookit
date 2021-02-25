import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useSarcasm } from '@hookit/sarcasm';

export default {
  title: 'hookit/useSarcasm',
} as Meta;

const DefaultTemplate: Story<{ text: string }> = ({ text }) => {
  const sarcasm = useSarcasm();

  return (
    <>
      <p>{sarcasm(text)}</p>
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  text: 'so you wanna use some hooks huh???',
};
