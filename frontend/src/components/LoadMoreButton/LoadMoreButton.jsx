import React, { useState, useEffect, useRef, useCallback } from "react";
import { getImages, getNewOffset, getDefaultOffset } from "../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";

const hasScrolledBottom = () => window.innerHeight + window.scrollY >= document.body.offsetHeight;

const LoadMoreButton = ({
  imageType,
  inputValue,
  afterLoad,
}) => {
  const loadingRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const offset = useRef(getDefaultOffset(imageType) + 1);

  const loadMoreImages = useCallback(async (loadOffset) => {
    setIsLoading(true);

    return getImages(imageType, loadOffset, inputValue)
      .then((newImages) => {
        if (!loadingRef.current) return;

        const newOffset = getNewOffset(imageType, loadOffset);
        offset.current = newOffset;
        loadingRef.current = false;

        afterLoad(newImages);
        setIsLoading(false);
      });
  }, [imageType, afterLoad, inputValue]);


  let handleScroll = useCallback(() => {
    if (
      loadingRef.current || 
      !hasScrolledBottom()
    ) return;

    loadingRef.current = true;
    loadMoreImages(offset.current);
  }, [loadMoreImages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      loadingRef.current = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="more-images">
      {!isLoading ? (
        <button className="more-images-button">
          <FontAwesomeIcon
            className="load-more-icon"
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
