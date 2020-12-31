import * as React from 'react';

export type PermissionsType<
  Permission extends string | number = string | number,
  Role extends string | number = string | number
> = {
  [key in Permission]: Role[] | (() => Role[]) | (() => Promise<Role[]>);
};

const PermissionsContext = React.createContext<PermissionsType>(undefined);

export const PermissionsProvider = <Rules extends PermissionsType>({
  children,
  rules,
}: {
  children: React.ReactNode;
  rules: Rules;
}) => {
  return <PermissionsContext.Provider value={rules}>{children}</PermissionsContext.Provider>;
};

const errorMessages = {
  returnTypeError:
    'Rules must be an array of type string | number, or an executable resolver that returns an array of type string | number.',
  ruleTypeError:
    'Rules must be an array of type string | number, or an executable resolver that returns an array of type string | number.',
};

export const usePermissions = <Permission extends string | number, Role extends string | number>(role: Role) => {
  const rules = React.useContext(PermissionsContext);

  const bools = React.useMemo<{ [K in Permission]: boolean }>(
    () =>
      Object.keys(rules).reduce((permissions, rule) => {
        if (typeof rules[rule] === 'function') {
          return ((rules[rule] as Function)() as Role[]).some((user) => {
            if (typeof user !== 'string' || typeof user !== 'number') {
              throw new Error(errorMessages.returnTypeError);
            }

            return user === role;
          })
            ? {
                ...permissions,
                [rule]: true,
              }
            : {
                ...permissions,
                [rule]: false,
              };
        }

        if (typeof rules[rule] === 'object') {
          return (rules[rule] as string[]).some((user) => user === role)
            ? {
                ...permissions,
                [rule]: true,
              }
            : {
                ...permissions,
                [rule]: false,
              };
        }

        throw new Error(errorMessages.ruleTypeError);
      }, {} as { [K in Permission]: boolean }),
    [role, rules],
  );

  return bools;
};
