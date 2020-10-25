import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useNetworkStatus from '@hooky/network-status';

export default {
  title: 'Hooky/useNetworkStatus',
} as Meta;

export const Default: Story = () => {
  const networkStatus = useNetworkStatus();

  return (
    <>
      <p>Try disabling/enabling your network connection.</p>
      <p>{networkStatus ? 'Online ✅' : 'Offline 🚫'}</p>
    </>
  );
};
