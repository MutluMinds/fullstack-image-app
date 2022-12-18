import React, { useState, useEffect, useRef } from "react";


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
  const loadingRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreImages = async (loadOffset) => {
    setIsLoading(true);

    getImages(imageType, loadOffset, inputValue).then((receivedImages) => {
      const newOffset = getNewOffset(imageType, loadOffset);
      setImages((images) => [...images, ...receivedImages]);
      setOffset(newOffset);
      setIsLoading(false);
      loadingRef.current = false;
    });
  };
  const handleScroll = () => {
    if (!loadingRef.current && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setOffset(currentOffset => {
        loadingRef.current = true;
        loadMoreImages(currentOffset);
        return currentOffset;
      });
    }
  };

  return (
    <div className="moreImages">
      {!isLoading ? (
        <button className="moreImagesButton" onClick={() => loadMoreImages(offset)}>
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
