import React, { useState } from "react";
import Pic from "./justaPhoto.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import "./_ImageLikeUi.css";
function LikeUI() {
  const [solid, setSolid] = useState(false);
  window.addEventListener("dblclick", () => {
    setSolid(!solid);
  });
  return (
    <div className="imageMain">
      <div
        className="likeButton"
        onMouseEnter={() => setSolid(!solid)}
        onMouseLeave={() => setSolid(!solid)}
        onClick={() => setSolid(!solid)}
      >
        <FontAwesomeIcon icon={solid ? fasHeart : farHeart} />
      </div>
      <img className="image" src={Pic} alt="" />
    </div>
  );
}

export default LikeUI;
