import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function ImageWithFallback({ src, fallback = "", ...props }: Props) {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallback || "https://via.placeholder.com/400")}
    />
  );
}
