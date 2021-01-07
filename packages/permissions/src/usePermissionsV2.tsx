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

export const PermissionsProviderV2 = <R extends TRules>({
  children,
  rules,
}: {
  children: React.ReactNode;
  rules: R;
}) => {
  return <PermissionsContext.Provider value={{ rules }}>{children}</PermissionsContext.Provider>;
};

export const usePermissionsV2 = <Permissions extends string = string, Roles extends string = string>(role: Roles) => {
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
      let result = (currentRole[permission] as Function)(permissionData);

      if (typeof result !== 'boolean') {
        console.error('Permissions in rules must be of type `boolean` or a function that returns a boolean');
        return false;
      }

      return result;
    }

    if (typeof currentRole[permission] !== 'boolean') {
      console.error('Permissions in rules must be of type `boolean` or a function that returns a boolean');
      return false;
    }

    return currentRole[permission] as boolean;
  };

  return { canAccess };
};
