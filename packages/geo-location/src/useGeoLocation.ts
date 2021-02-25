import * as React from 'react';

type State = {
  geoLocation: GeolocationPosition;
  error: GeolocationPositionError;
};

enum Action {
  LOCATION = 'location',
  ERROR = 'error',
}

type ReducerAction = {
  type: Action;
  payload: {
    geoLocation?: GeolocationPosition;
    error?: GeolocationPositionError;
  };
};

const geoLocationReducer: React.Reducer<State, ReducerAction> = (_, { type, payload }) => {
  const { error, geoLocation } = payload;

  switch (type) {
    case Action.LOCATION: {
      return { geoLocation, error: undefined };
    }

    case Action.ERROR: {
      return { geoLocation: undefined, error };
    }
  }
};

type Return = {
  error: GeolocationPositionError;
  geoLocation: GeolocationPosition;
  getPosition: () => void;
};

export const useGeoLocation = (watch: boolean = false, options?: PositionOptions): Return => {
  const [{ geoLocation, error }, dispatch] = React.useReducer(geoLocationReducer, {
    geoLocation: undefined,
    error: undefined,
  });

  const handleSuccess = (geoLocation: GeolocationPosition) =>
    dispatch({ type: Action.LOCATION, payload: { geoLocation } });
  const handleError = (error: GeolocationPositionError) => dispatch({ type: Action.ERROR, payload: { error } });

  const getPosition = React.useCallback(
    () => navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options),
    [options],
  );

  React.useEffect(() => {
    let id: number;

    if (watch) {
      id = navigator.geolocation.watchPosition(handleSuccess, handleError, options);
    }

    return () => {
      if (watch) {
        navigator.geolocation.clearWatch(id);
      }
    };
  }, [options, watch]);

  return {
    error,
    geoLocation,
    getPosition,
  };
};
