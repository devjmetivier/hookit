import { useEffect, useState } from 'react';

export const useMedia = <T = any>(queries: string[], values: T[], defaultValue: T) => {
  const mediaQueryLists = queries.map((q) => (typeof window !== 'undefined' ? window.matchMedia(q) : undefined));

  const getValue = () => {
    if (!mediaQueryLists[0]) return defaultValue;

    const index = mediaQueryLists.findIndex((mql) => mql.matches);

    return values?.[index] || defaultValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);

    mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));

    return () => mediaQueryLists.forEach((mql) => mql.removeEventListener('change', handler));
  }, []);

  return value;
};
