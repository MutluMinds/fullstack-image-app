import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";

import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

function LikeUI({ images, handleShow }) {
  const [solid, setSolid] = useState(false);
  const handleDoubleClick = () => {
    setSolid(!solid);
  };
  return (
    <>
      <img
        className="search_gallery--image"
        src={images.src}
        alt={images.title}
        onDoubleClick={() => handleDoubleClick()}
      />
      <button
        className="like-icon"
        onMouseEnter={() => setSolid(!solid)}
        onMouseLeave={() => setSolid(!solid)}
        onClick={() => setSolid(!solid)}
      >
        <FontAwesomeIcon icon={solid || images.likes ? fasHeart : farHeart} />
      </button>
      <button className="expand-button" onMouseDown={() => handleShow(images)}>
        <FontAwesomeIcon icon={faExpandAlt} inverse size="md" />
      </button>
    </>
  );
}

export default LikeUI;
