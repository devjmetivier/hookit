import * as React from "react";
import { useWindowEventListener } from "./useWindowEventListener";

type State = {
  status: boolean;
};

enum Actions {
  SET_ONLINE,
  SET_OFFLINE,
}

type Action = {
  type: Actions;
};

const networkStatusReducer: React.Reducer<State, Action> = (_, action) => {
  switch (action.type) {
    case Actions.SET_ONLINE:
      return { status: true };
    case Actions.SET_OFFLINE:
      return { status: false };
    default:
      return { status: true };
  }
};

const initialState = { status: true };

export const useNetworkStatus = () => {
  const [state, dispatch] = React.useReducer(networkStatusReducer, initialState);

  const onlineHandler = React.useCallback(
    (e) => {
      dispatch({ type: Actions.SET_ONLINE });
      console.log(e);
    },
    [dispatch]
  );
  const offlineHandler = React.useCallback(
    (e) => {
      dispatch({ type: Actions.SET_OFFLINE });
      console.log(e);
    },
    [dispatch]
  );

  useWindowEventListener("online", onlineHandler);
  useWindowEventListener("offline", offlineHandler);

  return state;
};
