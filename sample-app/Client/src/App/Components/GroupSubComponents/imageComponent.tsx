import React from "react";

interface ImageComponentProps {
  src: string;
  alt: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => {
  return (
    <img
      width="100%"
      height="100%"
      src={src}
      alt={alt}
    />
  );
};

export default ImageComponent;
