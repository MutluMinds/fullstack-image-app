import React from "react";
import classnames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart  } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";

const Overlay = ({
  liked,
  onLike, 
  onExpand, 
}) => {
  const getLikeIcon = () => {
    return liked ? faFilledHeart : faHeart;
  };

  return (
    <>
      <button 
        className={classnames(
          "like-button",
          { liked }
        )}
        onClick={onLike}
      >
        <FontAwesomeIcon icon={getLikeIcon()} />
      </button>
      <button
        className="expand-button"
        onMouseDown={onExpand}
      >
        <FontAwesomeIcon icon={faExpandAlt} inverse/>
      </button>
    </>
  );
};

export default Overlay;
