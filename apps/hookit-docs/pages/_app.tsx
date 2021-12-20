import * as React from 'react';
import type { AppProps } from 'next/app';
import 'nextra-theme-docs/style.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
