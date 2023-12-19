import * as React from 'react';

import { forgotArgs, mustBeBoolean, usePermissionsErrorLabel } from './messages';

export type TPermissions<P extends string = string> = Partial<{
  [K in P]: boolean | ((args: any) => boolean) | ((args: any) => Promise<boolean>);
}>;

export type TRules<P extends string = string, R extends string = string> = Partial<{
  [K in R]: TPermissions<P>;
}>;

type TProvider<P extends string = string, R extends string = string> = {
  rules: TRules<P, R>;
};

const PermissionsContext = React.createContext(undefined);

export const PermissionsProvider = <R extends TRules>({ children, rules }: { children: React.ReactNode; rules: R }) => {
  return <PermissionsContext.Provider value={{ rules }}>{children}</PermissionsContext.Provider>;
};

export const usePermissions = <Permissions extends string = string, Roles extends string = string>(role: Roles) => {
  const { rules } = React.useContext<TProvider<Permissions, Roles>>(PermissionsContext);

  const canAccess = function <PermissionData>(permission: Permissions, permissionData?: PermissionData): boolean {
    const currentRole = rules[role];

    if (!currentRole) {
      return false;
    }

    if (!currentRole[permission]) {
      return false;
    }

    if (typeof currentRole[permission] === 'function') {
      try {
        const result = (currentRole[permission] as Function)(permissionData);

        if (typeof result !== 'boolean') {
          console.error(mustBeBoolean);
          return false;
        }

        return result;
      } catch (error) {
        console.log(...usePermissionsErrorLabel);
        console.error({ error });

        forgotArgs();

        return false;
      }
    }

    if (typeof currentRole[permission] !== 'boolean') {
      console.error(mustBeBoolean);
      return false;
    }

    return currentRole[permission] as boolean;
  };

  return { canAccess };
};
