import React, { useState, useEffect } from "react";

const LazyImg = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };

    return () => {
      img.src = null;
      img.onload = null;
    };
  }, [src]);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "lazy-loading" : "lazy-loaded";

  return (
    <img
      className={`image ${customClass}`}
      loading="lazy"
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ""}
    />
  );
};
export default LazyImg;
