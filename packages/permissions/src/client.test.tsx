import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { consoleError, consoleLog } from '../../../mocks/console';

import * as Messages from './messages';
import { usePermissions, PermissionsProvider, TPermissions, TRules } from './usePermissions';

type Permissions = 'DoThis' | 'DoThat' | 'GetThis' | 'GetThat';
type Roles = 'admin' | 'normal' | 'free';
type ResolverArgs = { firstArg: number; secondArg: number };

const admin: TPermissions<Permissions> = {
  DoThis: true,
  DoThat: true,
  GetThis: true,
  GetThat: true,
};

const normal: TPermissions<Permissions> = {
  DoThis: true,
  DoThat: ({ firstArg, secondArg }: ResolverArgs) => firstArg === secondArg,
  GetThis: false,
  GetThat: ({ firstArg, secondArg }: ResolverArgs) => firstArg === secondArg,
};

const rules: TRules<Permissions, Roles> = {
  admin,
  normal,
};

const corruptedRules = {
  admin: {
    DoThis: 1,
    DoThat: 1,
  },
  normal: {
    DoThis: () => 'hello',
    DoThat: () => 'moto',
  },
};

const equalArgs: ResolverArgs = { firstArg: 1, secondArg: 1 };
const unequalArgs: ResolverArgs = { firstArg: 1, secondArg: 2 };

const wrapper = ({ children }: any) => <PermissionsProvider rules={rules}>{children}</PermissionsProvider>;

const mockUseContext = jest.fn().mockImplementation(() => ({ rules }));
const mockCorruptUseContext = jest.fn().mockImplementation(() => ({ rules: corruptedRules }));

beforeEach(() => {
  consoleError.mockClear();
  consoleLog.mockClear();
});

describe('usePermissions CSR', () => {
  const messagesSpy = jest.spyOn(Messages, 'forgotArgs');

  const setup = (role: Roles) => {
    React.useContext = mockUseContext;
    messagesSpy.mockImplementation(() => null);

    const renderedHook = renderHook(
      (roleFromProps: Roles) => usePermissions<Permissions, Roles>(roleFromProps || role),
      { wrapper },
    );

    return renderedHook;
  };

  const setupCorrupt = (role: Roles) => {
    React.useContext = mockCorruptUseContext;
    messagesSpy.mockImplementation(() => null);

    const renderedHook = renderHook(
      (roleFromProps: Roles) => usePermissions<Permissions, Roles>(roleFromProps || role),
      { wrapper },
    );

    return renderedHook;
  };

  it('canAccess => true with `admin` role for the `DoThis` permission with no arguments', () => {
    const { result } = setup('admin');

    expect(result.current.canAccess('DoThis')).toBeTruthy();
  });

  it('canAccess => false with `normal` role for the `DoThis` permission with no arguments', () => {
    const { result } = setup('normal');

    expect(result.current.canAccess('DoThis')).toBeTruthy();
  });

  it('canAccess => true with `admin` role for the `GetThis` permission with no arguments', () => {
    const { result } = setup('admin');

    expect(result.current.canAccess('GetThis')).toBeTruthy();
  });

  it('canAccess => false with `normal` role for the `GetThis` permission with no arguments', () => {
    const { result } = setup('normal');

    expect(result.current.canAccess('GetThis')).toBeFalsy();
  });

  it('canAccess => true with `admin` role for the `DoThat` permission with equal arguments', () => {
    const { result } = setup('admin');

    expect(result.current.canAccess<ResolverArgs>('DoThat', equalArgs)).toBeTruthy();
  });

  it('canAccess => true with `admin` role for the `DoThat` permission with unequal arguments', () => {
    const { result } = setup('admin');

    expect(result.current.canAccess<ResolverArgs>('DoThat', unequalArgs)).toBeTruthy();
  });

  it('canAccess => true with `normal` role for the `DoThat` permission with equal arguments', () => {
    const { result } = setup('normal');

    expect(result.current.canAccess<ResolverArgs>('DoThat', equalArgs)).toBeTruthy();
  });

  it('canAccess => false with `normal` role for the `DoThat` permission with unequal arguments', () => {
    const { result } = setup('normal');

    expect(result.current.canAccess<ResolverArgs>('DoThat', unequalArgs)).toBeFalsy();
  });

  it('canAccess => false and errors with `normal` role for the `DoThat` permission with no arguments', () => {
    const { result } = setup('normal');

    expect(result.current.canAccess('DoThat')).toBeFalsy();
    expect(consoleLog).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(1);
  });

  it("canAccess => false with `free` role because it doesn't exist in rules", () => {
    const { result } = setup('free');

    expect(result.current.canAccess('DoThat')).toBeFalsy();
  });

  it('canAccess => false and errors with `admin` role for the `DoThis` permission because typeof permission is not boolean', () => {
    const { result } = setupCorrupt('admin');

    expect(result.current.canAccess('DoThis')).toBeFalsy();
    expect(consoleError).toHaveBeenCalledTimes(1);
  });

  it('canAccess => false and errors with `normal` role for the `DoThis` permission because typeof return of permission is not boolean', () => {
    const { result } = setupCorrupt('normal');

    expect(result.current.canAccess('DoThis')).toBeFalsy();
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(messagesSpy).toHaveBeenCalledTimes(1);
  });
});
