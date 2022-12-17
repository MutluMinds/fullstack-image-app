import React, { useState, useEffect } from "react";
import { DEFAULT_GIPHY_OFFSET } from "../static/constants";
import { getDefaultOffset, getImages, getNewOffset } from "../utils";

import StickyBar from "../components/StickyBar/StickyBar";
import Loading from "../components/Loading/Loading";
import Gallery from "../components/Gallery/Gallery";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";

const GalleryPage = ({ imageType }) => {
  const [offset, setOffset] = useState(DEFAULT_GIPHY_OFFSET);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const defaultOffset = getDefaultOffset(imageType);

    getImages(imageType, defaultOffset, inputValue).then((receivedImages) => {
      const newOffset = getNewOffset(imageType, defaultOffset);
      setImages(receivedImages);
      setOffset(newOffset);
      setIsLoading(false);
    });
  }, [imageType, inputValue]);

  return (
    <div className="page">
      <StickyBar setInputValue={setInputValue} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Gallery images={images} />
          <LoadMoreButton
            imageType={imageType}
            inputValue={inputValue}
            offset={offset}
            setOffset={setOffset}
            setImages={setImages}
          />
        </>
      )}
    </div>
  );
};

export default GalleryPage;
