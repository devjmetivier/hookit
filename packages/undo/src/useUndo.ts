import * as React from 'react';

type State<T = any> = {
  past: T[];
  present: T;
  future: T[];
};

enum Action {
  UNDO = 'UNDO',
  REDO = 'REDO',
  SET = 'SET',
  RESET = 'RESET',
}

type ReducerAction<T = any> = {
  type: Action;
  payload?: {
    newPresent: T;
  };
};

export const useUndo = <T = unknown>(
  initialPresent?: T,
): [
  State<typeof initialPresent>,
  {
    canUndo: boolean;
    canRedo: boolean;
    redo: () => void;
    reset: (newPresent: T) => void;
    set: (newPresent: T) => void;
    undo: () => void;
  },
] => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<State<typeof initialPresent>, ReducerAction<typeof initialPresent>>
  >(
    (state, { type, payload }) => {
      const { past, present, future } = state;

      switch (type) {
        case Action.UNDO: {
          if (past.length === 0) return state;

          const previous = past[past.length - 1];
          const newPast = past.slice(0, past.length - 1);

          return {
            past: newPast,
            present: previous,
            future: [present, ...future],
          };
        }

        case Action.REDO: {
          if (future.length === 0) return state;

          const next = future[0];
          const newFuture = future.slice(1);

          return {
            past: [...past, present],
            present: next,
            future: newFuture,
          };
        }

        case Action.SET: {
          if (payload.newPresent === present) return state;

          return {
            past: [...past, present],
            present: payload.newPresent,
            future: [],
          };
        }

        case Action.RESET: {
          return {
            past: [],
            present: payload.newPresent,
            future: [],
          };
        }
      }
    },
    {
      past: [],
      present: initialPresent,
      future: [],
    },
  );

  const canRedo = state.future.length !== 0;
  const canUndo = state.past.length !== 0;

  const redo = React.useCallback(() => dispatch({ type: Action.REDO }), []);
  const reset = React.useCallback((newPresent) => dispatch({ type: Action.RESET, payload: { newPresent } }), []);
  const set = React.useCallback((newPresent) => dispatch({ type: Action.SET, payload: { newPresent } }), []);
  const undo = React.useCallback(() => dispatch({ type: Action.UNDO }), []);

  return [
    state,
    {
      canRedo,
      canUndo,
      redo,
      reset,
      set,
      undo,
    },
  ];
};
