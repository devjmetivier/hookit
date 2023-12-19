import { createElement } from 'react';

import { renderToString } from 'react-dom/server';

export default function renderHookServer<F>(hook: () => F): F {
  let result;

  function Wrapper() {
    result = hook();
    return createElement('div');
  }

  renderToString(createElement(Wrapper));

  return result;
}
