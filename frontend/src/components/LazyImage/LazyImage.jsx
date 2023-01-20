import React, { useState, useEffect } from "react";
import noImg from "../../assets/images/no_image.jpg";

const LazyImg = ({ placeholderSrc, src, ...props }) => {
  const [blurred, setBlurred] = useState(true);
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const ac = new AbortController();

    fetch(src, { signal: ac.signal })
      .then(res => {
        setImgSrc(res.ok ? src : noImg);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setImgSrc(noImg);
      });

    return () => ac.abort();
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
