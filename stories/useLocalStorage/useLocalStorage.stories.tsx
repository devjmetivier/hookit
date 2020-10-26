import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import useLocalStorage from '@hookit/local-storage';

export default {
  title: 'hookit/useLocalStorage',
} as Meta;

const key = 'useLocalStorage';
const initalValue = 'Hello, Moto!';

export const Default: Story = () => {
  const [storageItem] = useLocalStorage(key);

  return (
    <>
      <p>Local storage item has not been set, and has been provided no default.</p>
      <p>Therefore, the returned value is undefined.</p>

      <p>
        {key}: {storageItem ? storageItem : '¯_(ツ)_/¯'}
      </p>
    </>
  );
};

export const WithDefaultValue: Story = () => {
  const [storageItem] = useLocalStorage(key, initalValue);

  React.useEffect(() => {
    window.localStorage.removeItem(key);
  }, []);

  return (
    <>
      <p>Local storage item hasn't been set, but a default was provided.</p>
      <p>Default value is "{initalValue}"</p>
      <p>
        Check your local storage in dev tools to confirm that there is no key/value pair with the key of "{key}". (You
        may have to refresh this page)
      </p>

      <p>Returned Value: {storageItem ? storageItem : '¯_(ツ)_/¯'}</p>
    </>
  );
};

export const SetItem: Story = () => {
  const [state, setState] = React.useState('');
  const [storageItem, setStorageItem] = useLocalStorage(key, initalValue);

  return (
    <>
      <p>Local storage item hasn't been set, but a default was provided.</p>
      <p>Use the inputs below to set your local storage to whatever you'd like.</p>
      <p>Check your local storage in dev tools as you type to confirm "{key}" value changing.</p>

      <p>
        {key}: {storageItem ? storageItem : '¯_(ツ)_/¯'}
      </p>

      <div id='ls' style={{ marginTop: '2rem' }}>
        Set local storage value:
      </div>
      <input aria-labelledby='ls' onChange={({ target }) => setStorageItem(target.value)} type='text' />

      <div style={{ marginTop: '2rem' }}>Get local storage value:</div>
      <button onClick={() => setState(window.localStorage.getItem(key))} type='button'>
        Click Me
      </button>
      <div>Result: {state}</div>
    </>
  );
};
