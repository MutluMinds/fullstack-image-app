import React, { useState, useEffect, useRef, useCallback } from "react";
import { getImages, getNewOffset, getDefaultOffset } from "../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";

const hasScrolledBottom = () => window.innerHeight + window.scrollY >= document.body.offsetHeight;

const LoadMoreButton = ({
  apiType,
  inputValue,
  afterLoad,
}) => {
  const loadingRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const offset = useRef(getDefaultOffset(apiType) + 1);

  const loadMoreImages = useCallback(async (loadOffset) => {
    setIsLoading(true);

    return getImages(apiType, loadOffset, inputValue)
      .then((newImages) => {
        if (!loadingRef.current) return;

        const newOffset = getNewOffset(apiType, loadOffset);
        offset.current = newOffset;
        loadingRef.current = false;

        afterLoad(newImages);
        setIsLoading(false);
      });
  }, [apiType, afterLoad, inputValue]);


  const handleScroll = useCallback(() => {
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
