import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";
import { getImages, getNewOffset } from "../../utils";

const LoadMoreButton = ({
  imageType,
  inputValue,
  offset,
  setOffset,
  setImages,
}) => {
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const loadMoreImages = async () => {
    setIsLoading(true);

    getImages(imageType, offset, inputValue).then((receivedImages) => {
      const newOffset = getNewOffset(imageType, offset);
      setImages((images) => [...images, ...receivedImages]);
      setOffset(newOffset);
      setIsLoading(false);
    });
  };
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMoreImages();
    }
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
