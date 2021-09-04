import * as React from 'react';

export type Name = string;
export type Props = { [key: string]: any };

export const useWhyDidYouUpdate = (name: Name, props: { [key: string]: any }) => {
  const prevProps = React.useRef<typeof props>();

  React.useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });

      const changesObj: typeof props = {};

      allKeys.forEach((key) => {
        if (prevProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]:', `${name}\n`, changesObj);
      }
    }

    prevProps.current = props;
  }, [name, props]);
};
