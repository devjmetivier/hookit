import * as React from 'react';
import { useWindowEventListener } from '../../window-event-listener/src/useWindowEventListener';

type State = {
  status: boolean;
};

enum Action {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

type ReducerAction = {
  type: Action;
};

const networkStatusReducer: React.Reducer<State, ReducerAction> = (_, action) => {
  switch (action.type) {
    case Action.ONLINE:
      return { status: true };
    case Action.OFFLINE:
      return { status: false };
    default:
      return { status: true };
  }
};

export const useNetworkStatus = () => {
  // grab current online status (null check) and use to intialize state
  const [state, dispatch] = React.useReducer(networkStatusReducer, {
    status: typeof window !== 'undefined' ? window?.navigator?.onLine : undefined,
  });

  // memoize callbacks
  const onlineHandler = React.useCallback(() => dispatch({ type: Action.ONLINE }), [dispatch]);
  const offlineHandler = React.useCallback(() => dispatch({ type: Action.OFFLINE }), [dispatch]);

  // use event listeners
  useWindowEventListener(Action.ONLINE, onlineHandler);
  useWindowEventListener(Action.ONLINE, offlineHandler);

  return state;
};
