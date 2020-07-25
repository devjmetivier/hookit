/* eslint-disable arrow-parens */
/* eslint-disable max-lines-per-function */
import * as React from 'react';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

//! Exception will only exist in the dev invironment for testing purposes.

interface State<T = any> {
  data: T | undefined;
  error: AxiosError['response'] | undefined;
  loading: boolean;
}

enum Actions {
  FAILURE,
  LOADING,
  SUCCESS,
}

interface Action {
  error?: AxiosError;
  payload?: any;
  type: Actions;
}

const useRequestReducer: React.Reducer<State, Action> = (state, action) => {
  let error;

  switch (action.type) {
    case Actions.FAILURE:
      if (action.error?.response?.status === 401) {
        // We have to do this explicitly because 401 responses don't have response data
        error = 'Unauthorized Request';
      } else {
        error = action.error?.response?.data;
      }

      return {
        ...state,
        error,
        loading: false,
      };

    case Actions.LOADING:
      return { ...state, loading: true };

    case Actions.SUCCESS:
      return { ...state, data: action.payload, loading: false };

    default:
      return state;
  }
};

const initialState: State = {
  data: undefined,
  error: undefined,
  loading: false,
};

// TODO: Setup cancellable token/method
export const useRequest = <R = any>(
  options?: AxiosRequestConfig,
  onSuccess?: (res: AxiosResponse<R>) => void,
  onError?: (res: AxiosError) => void,
): [AxiosInstance, R | undefined, State['loading'], State['error']] => {
  const [{ data, error, loading }, dispatch] = React.useReducer<React.Reducer<State<R>, Action>>(
    useRequestReducer,
    initialState,
  );

  const axiosInstanceRef = React.useRef(
    axios.create({
      // TODO: Setup base info on axios instance for all requests (See current implementation in gila)
      // baseURL: 'https://api.testing.cloud.littlecaesars.com/bff/api/',
      baseURL: '/api/',
      ...options,
      headers: {
        'Accept-Language': 'en-US',
        'Cache-Control': 'no-cache, max-age=0',
        // TODO: Authorization token is going to come from somewhere else
        // eslint-disable-next-line max-len
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ink0cmRXcWo2NjFZM2JUNXdIZHJfaWciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1OTI1MDMwNTgsImV4cCI6MTU5MjUwNjY1OCwiaXNzIjoiaHR0cHM6Ly9sY2UtbWVudS1tYW5hZ2VyLWRldi1tb2NrLW9pZGMuYXp1cmV3ZWJzaXRlcy5uZXQiLCJjbGllbnRfaWQiOiJMQ0VNZW51TWFuYWdlciIsInN1YiI6InRlc3RAbGNlLmNvbSIsImF1dGhfdGltZSI6MTU5MjUwMzA1NywiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIl0sImFtciI6WyJwd2QiXX0.DUYG7lxO66t_2y6m7WEYziO14vLqF-AtSYf2TYWlx61rRbpiWLVF4xCegpzSslCQ8T2ccl7MKjQSark3BeVm7fIfewE3VROb_wmSmlTCppGeNQeL8zTY0hM8pR9rk0QDatoQq1WH0jty8QJmJd1v46VAyUok3feP-JuLqyfUZxtjMJomOj641qRbPAYzOO3zhXbO1T8CnpzgQ4xbjfSe32Q4fqfLbIoo0qYxsqQAFOAEtCZb7oZ_HWqyUyddzjbaOmtRsi__TlHC8BwXgfZsSXIhLfa-GVezgOF2pzyDDedDWxWwNainxX0EfENQhNpywYb_D9JhKsFo8rUNYfsinQ',
        ...options?.headers,
      },
    }),
  );

  React.useEffect(() => {
    const axiosInstance = axiosInstanceRef.current;

    //? Should we manually dispatch sentry errors in request/response interceptors?
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (request) => {
        dispatch({ type: Actions.LOADING });
        return request;
      },
      (error: AxiosError) => {
        onError && onError(error);
        //? Option: immediately return UI from errors to be rendered
        //? (could be an option to have UI or object returned, custom UI as well?)
        dispatch({ type: Actions.FAILURE, error });
      },
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        onSuccess && onSuccess(response);
        dispatch({ type: Actions.SUCCESS, payload: response.data });
        return response;
      },

      // TODO: Should expect an array of errors from BFF (needs testing)
      (error: AxiosError) => {
        onError && onError(error);
        //? Option: immediately return UI from errors to be rendered
        //? (could be an option to have UI or object returned, custom UI as well?)
        dispatch({ type: Actions.FAILURE, error });
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [onError, onSuccess]);

  return [axiosInstanceRef.current, data, loading, error];
};
