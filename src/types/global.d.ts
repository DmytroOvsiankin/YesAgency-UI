declare module '*.svg' {
  import { FunctionComponent } from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: FunctionComponent<SVGAttributes<SvgProps>>;
  export default content;
}

declare module '*.png' {
  const src: string;
  export default src;
}

type valueof<T> = T[keyof T];

type FormDataImage = { uri: string; type: string; name: string };
