declare module 'next/image' {
  import * as React from 'react';
  
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width: number;
    height: number;
    // additional props if needed
  }

  const Image: React.FC<ImageProps>;
  export default Image;
}
