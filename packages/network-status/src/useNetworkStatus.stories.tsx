import * as React from 'react';
import useNetworkStatus from '@hooky/network-status';

export default {
  title: 'useNetworkStatus',
};

export const Default = () => {
  const { status } = useNetworkStatus();

  return (
    <>
      <p>Try disabling/enabling your network connection.</p>
      <p>{status ? 'online' : 'offline'}</p>
    </>
  );
};
