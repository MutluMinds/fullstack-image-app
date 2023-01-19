import React, { useState, useEffect } from "react";
import noImg from "../../assets/images/no_image.jpg";

const LazyImg = ({ placeholderSrc, src, ...props }) => {
  const [blurred, setBlurred] = useState(true);
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    fetch(src)
      .then(res => {
        setImgSrc(res.ok ? src : noImg);
      })
      .catch(() => {
        setImgSrc(noImg);
      });
  }, [src]);

  return (
    <img
      className={`image ${blurred ? "lazy-loading" : "lazy-loaded"}`}
      loading="lazy"
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ""}
      onLoad={() => setBlurred(false)}
    />
  );
};
export default LazyImg;
