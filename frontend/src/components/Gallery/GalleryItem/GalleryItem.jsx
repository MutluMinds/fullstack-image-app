import React from "react";
import useMultipleTouch from "../../../hooks/useMultipleTouch";

import LazyImg from "../../LazyImage/LazyImage";
import Overlay from "../Overlay/Overlay";

const TOUCH_DELAY = 250;

const GalleryItem = ({ item, liked, onLike, onExpand, onCopy }) => {
  const onTouchStart = useMultipleTouch(touchCallback, TOUCH_DELAY);

  function touchCallback(touchAmount) {
    if (touchAmount === 2) {
      handleImageClick(touchAmount);
    }
  }

  function handleImageClick(amount) {
    if (amount % 2 === 0) {
      onLike();
    }
  }

  return (
    <div
      role="presentation"
      className="image-wrapper"
      style={{ cursor: "pointer" }}
      onClick={(e) => handleImageClick(e.detail)}
      onTouchStart={onTouchStart}
    >
      <LazyImg
        src={item.src}
        placeholderSrc={item.placeholderSrc}
        alt={item.title}
        width="100%"
        height="100%"
      />
      <Overlay
        liked={liked}
        onLike={onLike}
        onExpand={onExpand}
        onCopy={onCopy}
      />
    </div>
  );
};

export default GalleryItem;
