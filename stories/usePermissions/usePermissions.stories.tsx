import * as React from 'react';
import { ArgTypes, Meta, Story } from '@storybook/react/types-6-0';
import { PermissionsProviderV2, usePermissionsV2, TPermissions, TRules } from '@hookit/permissions';

export default { title: 'hookit/usePermissionsV2' } as Meta;

enum MMPermissionsEnum {
  DoThis = 'DoThis',
  DoThat = 'DoThat',
  GetThis = 'GetThis',
  GetThat = 'GetThat',
}
enum MMRolesEnum {
  admin = 'admin',
  normal = 'normal',
  free = 'free',
}

type MMPermissions = 'DoThis' | 'DoThat' | 'GetThis' | 'GetThat';
type MMRoles = 'admin' | 'normal' | 'free';

const admin: TPermissions<MMPermissions> = {
  DoThis: true,
  DoThat: true,
  GetThis: true,
  GetThat: true,
};

type ARGS = { firstArg: number; secondArg: number };

const normal: TPermissions<MMPermissions> = {
  DoThis: true,
  DoThat: ({ firstArg, secondArg }: ARGS) => firstArg === secondArg,
  GetThis: false,
  GetThat: ({ firstArg, secondArg }: ARGS) => firstArg === secondArg,
};

const rules: TRules<MMPermissions, MMRoles> = {
  admin,
  normal,
};

const PermissionsComponent: Story<{ role: MMRoles; firstArg: number; secondArg: number }> = ({
  role,
  firstArg,
  secondArg,
}) => {
  const { canAccess } = usePermissionsV2<MMPermissions, MMRoles>(role);

  const canDoThis = canAccess<ARGS>('DoThis', { firstArg, secondArg });
  const canDoThat = canAccess<ARGS>('DoThat', { firstArg, secondArg });
  const canGetThis = canAccess<ARGS>('GetThis', { firstArg, secondArg });
  const canGetThat = canAccess<ARGS>('GetThat', { firstArg, secondArg });

  return (
    <>
      <h3>Current User Role: {role}</h3>
      <p>canDoThis: {canDoThis ? '✅' : '🚫'}</p>
      <p>canDoThat: {canDoThat ? '✅' : '🚫'}</p>
      <p>canGetThis: {canGetThis ? '✅' : '🚫'}</p>
      <p>canGetThat: {canGetThat ? '✅' : '🚫'}</p>

      <p>
        Rules:
        <pre>
          <code>
            {JSON.stringify(
              rules,
              function (_, value) {
                return typeof value === 'function' ? 'Function' : value;
              },
              2,
            )}
          </code>
        </pre>
      </p>
    </>
  );
};

export const String: Story = (args: any) => {
  return (
    <PermissionsProviderV2 rules={rules}>
      <PermissionsComponent {...args} />
    </PermissionsProviderV2>
  );
};

String.argTypes = {
  role: {
    defaultValue: 'admin',
    control: {
      type: 'select',
      options: ['admin', 'normal', 'free'],
    },
  },
  firstArg: {
    defaultValue: 1,
    control: {
      type: 'number',
    },
  },
  secondArg: {
    defaultValue: 1,
    control: {
      type: 'number',
    },
  },
} as ArgTypes;
