import { useCallback, useReducer } from 'react';

import { useWindowEventListener } from '@hookit/window-event-listener';

type State = boolean;

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
      return true;
    case Action.OFFLINE:
      return false;
  }
};

export const useNetworkStatus = (): State => {
  // grab current online status (null check) and use to intialize state
  const [state, dispatch] = useReducer(
    networkStatusReducer,
    // can reasonably expect to have window.navigator.onLine value if window is present
    typeof window !== 'undefined' ? window.navigator.onLine : undefined,
  );

  // memoize callbacks
  const onlineHandler = useCallback(() => dispatch({ type: Action.ONLINE }), [dispatch]);
  const offlineHandler = useCallback(() => dispatch({ type: Action.OFFLINE }), [dispatch]);

  // use event listeners
  useWindowEventListener(Action.ONLINE, onlineHandler);
  useWindowEventListener(Action.OFFLINE, offlineHandler);

  return state;
};
