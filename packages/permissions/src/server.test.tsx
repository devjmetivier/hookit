/**
 * @jest-environment node
 */

import React from 'react';
import renderHookServer from '../../../utils/renderHookServer';
import { consoleError, consoleLog } from '../../../mocks/console';

import { usePermissions, TPermissions, TRules } from './usePermissions';
import * as Messages from './messages';

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

const mockUseContext = jest.fn().mockImplementation(() => ({ rules }));
const mockCorruptUseContext = jest.fn().mockImplementation(() => ({ rules: corruptedRules }));

beforeEach(() => {
  consoleError.mockClear();
  consoleLog.mockClear();
});

describe('usePermissions SSR', () => {
  const messagesSpy = jest.spyOn(Messages, 'forgotArgs');

  const setup = (role: Roles) => {
    React.useContext = mockUseContext;
    messagesSpy.mockImplementation(() => null);

    const renderedHook = renderHookServer(() => usePermissions<Permissions, Roles>(role));

    return renderedHook;
  };

  const setupCorrupt = (role: Roles) => {
    React.useContext = mockCorruptUseContext;
    messagesSpy.mockImplementation(() => null);

    const renderedHook = renderHookServer(() => usePermissions<Permissions, Roles>(role));

    return renderedHook;
  };

  it('canAccess => true with `admin` role for the `DoThis` permission with no arguments', () => {
    const { canAccess } = setup('admin');

    expect(canAccess('DoThis')).toBeTruthy();
  });

  it('canAccess => false with `normal` role for the `DoThis` permission with no arguments', () => {
    const { canAccess } = setup('normal');

    expect(canAccess('DoThis')).toBeTruthy();
  });

  it('canAccess => true with `admin` role for the `GetThis` permission with no arguments', () => {
    const { canAccess } = setup('admin');

    expect(canAccess('GetThis')).toBeTruthy();
  });

  it('canAccess => false with `normal` role for the `GetThis` permission with no arguments', () => {
    const { canAccess } = setup('normal');

    expect(canAccess('GetThis')).toBeFalsy();
  });

  it('canAccess => true with `admin` role for the `DoThat` permission with equal arguments', () => {
    const { canAccess } = setup('admin');

    expect(canAccess<ResolverArgs>('DoThat', equalArgs)).toBeTruthy();
  });

  it('canAccess => true with `admin` role for the `DoThat` permission with unequal arguments', () => {
    const { canAccess } = setup('admin');

    expect(canAccess<ResolverArgs>('DoThat', unequalArgs)).toBeTruthy();
  });

  it('canAccess => true with `normal` role for the `DoThat` permission with equal arguments', () => {
    const { canAccess } = setup('normal');

    expect(canAccess<ResolverArgs>('DoThat', equalArgs)).toBeTruthy();
  });

  it('canAccess => false with `normal` role for the `DoThat` permission with unequal arguments', () => {
    const { canAccess } = setup('normal');

    expect(canAccess<ResolverArgs>('DoThat', unequalArgs)).toBeFalsy();
  });

  it('canAccess => false and errors with `normal` role for the `DoThat` permission with no arguments', () => {
    const { canAccess } = setup('normal');

    expect(canAccess('DoThat')).toBeFalsy();
    expect(consoleLog).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledTimes(1);
  });

  it("canAccess => false with `free` role because it doesn't exist in rules", () => {
    const { canAccess } = setup('free');

    expect(canAccess('DoThat')).toBeFalsy();
  });

  it('canAccess => false and errors with `admin` role for the `DoThis` permission because typeof permission is not boolean', () => {
    const { canAccess } = setupCorrupt('admin');

    expect(canAccess('DoThis')).toBeFalsy();
    expect(consoleError).toHaveBeenCalledTimes(1);
  });

  it('canAccess => false and errors with `normal` role for the `DoThis` permission because typeof return of permission is not boolean', () => {
    const { canAccess } = setupCorrupt('normal');

    expect(canAccess('DoThis')).toBeFalsy();
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(messagesSpy).toHaveBeenCalledTimes(1);
  });
});
