export const usePermissionsErrorLabel = ['%cusePermissions error:', 'color: red; font-size: 20px'];

export const mustBeBoolean = 'Permissions in rules must be of type `boolean` or a function that returns a boolean.';

export const forgotArgs = () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    throw new Error(
      'This error likely occurred because you forgot to pass the proper arguments to the `canAccess` method of the `usePermissions` hook. Check your console for a more detailed error. In production builds, this error will only occur in the console and return false.',
    );
  }
};
