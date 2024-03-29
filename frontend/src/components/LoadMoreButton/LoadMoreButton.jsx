import React, { useState, useEffect, useRef, useCallback } from "react";
import { getImages, getNewOffset, getDefaultOffset } from "../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LIMIT } from "../../static/constants";
import { GALLERY_TABS } from "../GalleryTabs/GalleryTabs";

const hasScrolledBottom = () => window.innerHeight + window.scrollY >= document.body.offsetHeight;

const LoadMoreButton = ({
  apiType,
  inputValue,
  activeTab,
  afterLoad,
}) => {
  const loadingRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState(true);
  const offset = useRef(getDefaultOffset(apiType) + 1);
  const { storage } = useLocalStorage(apiType, []);

  useEffect(() => {
    setShouldDisplay(true);

    if (activeTab === GALLERY_TABS.gallery.id) {
      offset.current = getDefaultOffset(apiType) + 1;
    } else {
      offset.current = 1;
    }
  }, [activeTab, apiType]);

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

  const loadMoreFavImages = useCallback(() => {
    if (offset.current * LIMIT >= storage.length) {
      setShouldDisplay(false);
      return;
    }

    afterLoad(storage.slice(
      offset.current * LIMIT - 1, 
      (offset.current + 1) * LIMIT
    ));

    offset.current += 1;
  }, [afterLoad, storage, setShouldDisplay]);

  const handleScroll = useCallback(() => {
    if (
      loadingRef.current || 
      !hasScrolledBottom()
    ) return;

    if (activeTab === GALLERY_TABS.gallery.id) {
      loadingRef.current = true;
      loadMoreImages(offset.current);
    } else {
      loadingRef.current = true;
      loadMoreFavImages();
    }

  }, [loadMoreImages, loadMoreFavImages, activeTab]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      loadingRef.current = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (shouldDisplay &&
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
