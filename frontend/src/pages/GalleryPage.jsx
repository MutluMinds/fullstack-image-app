import React, { useState, useEffect } from "react";
import { getDefaultOffset, getImages } from "../utils";

import StickyBar from "../components/StickyBar/StickyBar";
import Loading from "../components/Loading/Loading";
import Gallery from "../components/Gallery/Gallery";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";
import Badge from "../components/Badge/Badge";

const GalleryPage = ({ imageType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const defaultOffset = getDefaultOffset(imageType);

    getImages(imageType, defaultOffset, inputValue)
      .then((receivedImages) => {
        setImages(receivedImages);
        setIsLoading(false);
      });
  }, [imageType, inputValue]);

  return (
    <div className="page">
      <StickyBar onSearch={searchTerm => setInputValue(searchTerm)} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {inputValue 
            ? <div className="d-flex align-items-center gap-2">
              <h1 className="d-inline-block">Search Results for</h1>
              <Badge inputValue={inputValue} onClick={() => setInputValue("")} />
            </div> 
            : <h1>Trending</h1>}
          <Gallery images={images} />
          <LoadMoreButton
            imageType={imageType}
            inputValue={inputValue}
            afterLoad={(newImages) => setImages(images => [...images, ...newImages])}
          />
        </>
      )}
    </div>
  );
};

export default GalleryPage;
