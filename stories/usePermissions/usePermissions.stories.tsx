import * as React from 'react';
import { Meta, Story, ArgTypes } from '@storybook/react/types-6-0';
import { PermissionsProvider, usePermissions, PermissionsType } from '@hookit/permissions';

export default {
  title: 'hookit/usePermissions',
} as Meta;

type PermissionsUnion = 'canDoThis' | 'canDoThat' | 'canGetThis' | 'canGetThat' | 'canViewThis' | 'canViewThat';
type RolesUnion = 'admin' | 'normal' | 'free';

const PermissionsStringComponent: React.FC<{ userRole: RolesUnion }> = ({ userRole }) => {
  const permissions = usePermissions<PermissionsUnion, RolesUnion>(userRole);

  return (
    <>
      <h3>Current User Role: {userRole}</h3>
      <div style={{ border: '1px solid black', marginBottom: '2rem', padding: '1rem' }}>
        {Object.keys(permissions).map((permission) => (
          <p key={permission}>
            {permission}: {permissions[permission] ? '✅' : '🚫'}
          </p>
        ))}
      </div>

      <p>
        Use the controls to switch between different user roles. You can also use the permissions multi-select controls
        to assign permissions to one or many user roles.
      </p>
    </>
  );
};

enum PermissionsEnum {
  CAN_DO_THIS,
  CAN_DO_THAT,
  CAN_GET_THIS,
  CAN_GET_THAT,
  CAN_VIEW_THIS,
  CAN_VIEW_THAT,
}

enum RolesEnum {
  ADMIN,
  NORMAL,
  FREE,
}

const PermissionsNumberComponent: React.FC<{ userRole: RolesEnum }> = ({ userRole }) => {
  const permissions = usePermissions<PermissionsEnum, RolesEnum>(userRole);

  return (
    <>
      <h3>Current User Role: {userRole}</h3>
      <div style={{ border: '1px solid black', marginBottom: '2rem', padding: '1rem' }}>
        {Object.keys(permissions).map((permission) => (
          <p key={permission}>
            {permission}: {permissions[permission] ? '✅' : '🚫'}
          </p>
        ))}
      </div>

      <p>
        Use the controls to switch between different user roles. You can also use the permissions multi-select controls
        to assign permissions to one or many user roles.
      </p>
    </>
  );
};

export const String: Story = ({ userRole, ...args }) => {
  return (
    <PermissionsProvider rules={args}>
      <PermissionsStringComponent userRole={userRole} />
    </PermissionsProvider>
  );
};

String.argTypes = {
  userRole: {
    defaultValue: 'admin',
    control: {
      type: 'select',
      options: ['admin', 'normal', 'free'],
    },
  },
  canDoThis: {
    defaultValue: ['admin'],
    control: {
      type: 'multi-select',
      options: ['admin', 'normal', 'free'],
    },
  },
  canDoThat: {
    defaultValue: ['admin'],
    control: {
      type: 'multi-select',
      options: ['admin', 'normal', 'free'],
    },
  },
  canGetThis: {
    defaultValue: ['admin', 'normal'],
    control: {
      type: 'multi-select',
      options: ['admin', 'normal', 'free'],
    },
  },
  canGetThat: {
    defaultValue: ['admin', 'normal'],
    control: {
      type: 'multi-select',
      options: ['admin', 'normal', 'free'],
    },
  },
  canViewThis: {
    defaultValue: ['admin', 'normal', 'free'],
    control: {
      type: 'multi-select',
      options: ['admin', 'normal', 'free'],
    },
  },
  canViewThat: {
    defaultValue: ['admin', 'normal', 'free'],
    control: {
      type: 'multi-select',
      options: ['admin', 'normal', 'free'],
    },
  },
} as ArgTypes;

export const Number: Story = ({ userRole, ...args }) => {
  return (
    <PermissionsProvider rules={args}>
      <PermissionsNumberComponent userRole={userRole} />
    </PermissionsProvider>
  );
};

Number.argTypes = {
  userRole: {
    defaultValue: 0,
    control: {
      type: 'select',
      options: [0, 1, 2],
    },
  },
  '0': {
    defaultValue: [0],
    control: {
      type: 'multi-select',
      options: [0, 1, 2],
    },
  },
  '1': {
    defaultValue: [0],
    control: {
      type: 'multi-select',
      options: [0, 1, 2],
    },
  },
  '2': {
    defaultValue: [0, 1],
    control: {
      type: 'multi-select',
      options: [0, 1, 2],
    },
  },
  '3': {
    defaultValue: [0, 1],
    control: {
      type: 'multi-select',
      options: [0, 1, 2],
    },
  },
  '4': {
    defaultValue: [0, 1, 2],
    control: {
      type: 'multi-select',
      options: [0, 1, 2],
    },
  },
  '5': {
    defaultValue: [0, 1, 2],
    control: {
      type: 'multi-select',
      options: [0, 1, 2],
    },
  },
} as ArgTypes;
