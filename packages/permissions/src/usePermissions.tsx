import * as React from 'react';

export type TPermissions<P extends string = string> = Partial<
  { [K in P]: boolean | ((args: any) => boolean) | ((args: any) => Promise<boolean>) }
>;

export type TRules<P extends string = string, R extends string = string> = Partial<
  {
    [K in R]: TPermissions<P>;
  }
>;

type TProvider<P extends string = string, R extends string = string> = {
  rules: TRules<P, R>;
};

const PermissionsContext = React.createContext(undefined);

export const PermissionsProvider = <R extends TRules>({ children, rules }: { children: React.ReactNode; rules: R }) => {
  return <PermissionsContext.Provider value={{ rules }}>{children}</PermissionsContext.Provider>;
};

export const usePermissions = <Permissions extends string = string, Roles extends string = string>(role: Roles) => {
  const { rules } = React.useContext<TProvider<Permissions, Roles>>(PermissionsContext);

  const canAccess = <PermissionData extends any = any>(
    permission: Permissions,
    permissionData?: PermissionData,
  ): boolean => {
    const currentRole = rules[role];

    if (!currentRole) {
      return false;
    }

    if (!currentRole[permission]) {
      return false;
    }

    if (typeof currentRole[permission] === 'function') {
      try {
        let result = (currentRole[permission] as Function)(permissionData);

        if (typeof result !== 'boolean') {
          console.error('Permissions in rules must be of type `boolean` or a function that returns a boolean');
          return false;
        }

        return result;
      } catch (error) {
        console.log('%cusePermissions error:', 'color: red; font-size: 20px');
        console.error({ error });

        if (process.env.NODE_ENV === 'development') {
          throw new Error(
            'This error likely occurred because you forgot to pass the proper arguments to the `canAccess` method of the `usePermissions` hook. Check your console for a more detailed error. In production builds, this error will only occur in the console and return false as a default.',
          );
        }

        return false;
      }
    }

    if (typeof currentRole[permission] !== 'boolean') {
      console.error('Permissions in rules must be of type `boolean` or a function that returns a boolean');
      return false;
    }

    return currentRole[permission] as boolean;
  };

  return { canAccess };
};
