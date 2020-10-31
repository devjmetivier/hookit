import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

const getItem = jest.spyOn(Storage.prototype, 'getItem');
const setItem = jest.spyOn(Storage.prototype, 'setItem');

const key = 'key';
const initialValue = 'Hello, Moto!';

const number = '0';
const string = 'value';
const object = '{"key":"value"}';
const realObject = { key: 'value' };
const array = '[1,2,3,4,5]';

describe('useLocalStorage CSR', () => {
  const { localStorage } = window;

  beforeEach(() => {
    window.localStorage.getItem = localStorage.getItem;
    window.localStorage.setItem = localStorage.setItem;
    localStorage.removeItem(key);
    setItem.mockClear();
    getItem.mockClear();
  });

  it('returns falsy default when no default is provided and item does not exist in storage', () => {
    const { result } = renderHook(() => useLocalStorage(key));

    const storageGetEvent = getItem.mock.calls;
    const storageSetEvent = setItem.mock.calls;

    expect(result.current[0]).toBeFalsy();
    expect(storageGetEvent.length).toBe(1);
    expect(storageSetEvent.length).toBe(0);
  });

  it('returns default provided value when item does not exist in storage', () => {
    const { result } = renderHook(() => useLocalStorage(key, number));

    expect(result.current[0]).toBe(number);
  });

  it('gets `string` that exists in storage and sets it as the inital state', () => {
    localStorage.setItem(key, string);

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    const storageGetEvent = getItem.mock.calls;
    const storageSetEvent = setItem.mock.calls;

    expect(storageGetEvent.length).toBe(1);
    expect(storageSetEvent.length).toBe(1);
    expect(result.current[0]).toBe(string);
  });

  it('gets `number` that exists in storage and sets it as the inital state', () => {
    localStorage.setItem(key, number);

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toBe(parseInt(number));
  });

  it('gets `object` that exists in storage and sets it as the inital state', () => {
    localStorage.setItem(key, object);

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toMatchObject(JSON.parse(object));
  });

  it('gets `array` that exists in storage and sets it as the inital state', () => {
    localStorage.setItem(key, array);

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toMatchObject(JSON.parse(array));
  });

  it('sets/overrides new/existing items in storage', () => {
    const first = 'first';
    const second = 'second';

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(localStorage.getItem(key)).toBeFalsy();
    expect(result.current[0]).toBe(initialValue);

    act(() => result.current[1](first));

    expect(result.current[0]).toBe(first);

    act(() => result.current[1](second));

    expect(result.current[0]).toBe(second);
  });

  it('sets real objects in storage', () => {
    const { result } = renderHook(() => useLocalStorage(key, realObject));

    expect(localStorage.getItem(key)).toBeFalsy();
    expect(result.current[0]).toBe(realObject);

    act(() => result.current[1]({ key: 'newValue' }));

    expect(result.current[0]).toMatchObject({ key: 'newValue' });
  });
});
