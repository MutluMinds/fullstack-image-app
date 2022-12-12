import React, { useState } from "react";
import { LIMIT } from "../../static/constants";
import { IMAGE_TYPE_GIFS } from "../../static/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";
import getImages from "../../utils/getImages";

const LoadMoreButton = ({
  imageType,
  inputValue,
  offset,
  setOffset,
  setImages,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  function getNewOffset(prevOffset) {
    return imageType === IMAGE_TYPE_GIFS ? prevOffset + LIMIT + 1 : offset + 1;
  }

  const loadMoreImages = async () => {
    setIsLoading(true);

    getImages(imageType, offset, inputValue)
      .then(receivedImages => {
        const newOffset = getNewOffset(offset);
        setImages((images) => [...images, ...receivedImages]);
        setOffset(newOffset);
        setIsLoading(false);
      })
  };

  return (
    <div className="moreImages">
      {!isLoading ? (
        <button className="moreImagesButton" onClick={loadMoreImages}>
          <FontAwesomeIcon
            style={{ color: "white", fontSize: "32px" }}
            icon={faAngleDown}
          />
        </button>
      ) : (
        <Loading variant="small" />
      )}
    </div>
  );
};

export default LoadMoreButton;
