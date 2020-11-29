import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useMedia from '@hookit/media';

export default {
  title: 'hookit/useMedia',
} as Meta;

export const Numbers: Story = () => {
  const value = useMedia(
    ['(min-width: 1000px)', '(min-width: 900px)', '(min-width: 800px)'],
    [12345678, 1234567, 123456],
    12345,
  );

  return (
    <>
      <p>Try resizing the story window to print a different number.</p>
      <p>Value: {value}</p>
    </>
  );
};

export const Strings: Story = () => {
  const value = useMedia(
    ['(min-width: 1000px)', '(min-width: 900px)', '(min-width: 800px)'],
    ['extra', 'large', 'medium'],
    'small',
  );

  return (
    <>
      <p>Try resizing the story window to print a different string.</p>
      <p>Value: {value}</p>
    </>
  );
};

export const Objects: Story = () => {
  const { mq } = useMedia(
    ['(min-width: 1000px)', '(min-width: 900px)', '(min-width: 800px)'],
    [{ mq: 'extra' }, { mq: 'large' }, { mq: 'medium' }],
    { mq: 'small' },
  );

  return (
    <>
      <p>Try resizing the story window to print a different value from an object.</p>
      <p>Value: {mq}</p>
    </>
  );
};
