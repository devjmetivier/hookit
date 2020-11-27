import * as React from 'react';

type State = { on: boolean };

enum Action {
  TOGGLE = 'toggle',
  ON = 'on',
  OFF = 'off',
}

type ReducerAction = {
  type: Action;
};

const toggleReducer: React.Reducer<State, ReducerAction> = ({ on }, { type }) => {
  switch (type) {
    case Action.TOGGLE: {
      return { on: !on };
    }

    case Action.ON: {
      return { on: true };
    }

    case Action.OFF: {
      return { on: false };
    }
  }
};

const useToggle = (initialState: boolean = false) => {
  const [{ on }, dispatch] = React.useReducer(toggleReducer, { on: initialState });

  const toggle = () => dispatch({ type: Action.TOGGLE });
  const setOn = () => dispatch({ type: Action.ON });
  const setOff = () => dispatch({ type: Action.OFF });

  return { on, toggle, setOn, setOff };
};

export default useToggle;
