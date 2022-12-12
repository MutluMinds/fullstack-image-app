import React, { useState, useEffect } from "react";
import {
  IMAGE_TYPE_GIFS,
  DEFAULT_GIPHY_OFFSET,
  DEFAULT_PIXABAY_OFFSET,
  LIMIT
} from "./static/constants";
import getImages from "./utils/getImages";

import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./components/Gallery/Gallery";
import SearchImage from "./components/SearchImage/SearchImage";
import Corner from "./components/Corner/Corner";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";

const getDefaultOffset = (imageType) =>
  imageType === IMAGE_TYPE_GIFS ? DEFAULT_GIPHY_OFFSET : DEFAULT_PIXABAY_OFFSET;

function App() {
  const [imageType, setImageType] = useState(IMAGE_TYPE_GIFS);
  const [offset, setOffset] = useState(DEFAULT_GIPHY_OFFSET);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const defaultOffset = getDefaultOffset(imageType);

    getImages(imageType, defaultOffset).then((receivedImages) => {
      const newOffset = getNewOffset(defaultOffset);
      setImages(receivedImages);
      setOffset(newOffset);
      setIsLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageType]);

  function getNewOffset(prevOffset) {
    return imageType === IMAGE_TYPE_GIFS ? prevOffset + LIMIT + 1 : offset + 1;
  }

  function handleNavbarChange(value) {
    setInputValue("");
    setImageType(value);
    setInitialOffsetValue(value);
  }

  async function switchImagesProvider(searchTerm) {
    setIsLoading(true);
    setInputValue(searchTerm);

    const defaultOffset = getDefaultOffset(imageType);
    getImages(imageType, defaultOffset, searchTerm).then((receivedImages) => {
      const newOffset = getNewOffset(defaultOffset);
      setImages(receivedImages);
      setOffset(newOffset);
      setIsLoading(false);
    });
  }

  const setInitialOffsetValue = (value) => {
    value === IMAGE_TYPE_GIFS ? setOffset(0) : setOffset(1);
  };

  return (
    <div className="App">
      <Navbar
        onChange={(value) => handleNavbarChange(value)}
        value={imageType}
      />
      <Corner />
      <SearchImage
        onChange={(searchTerm) => switchImagesProvider(searchTerm)}
        value={inputValue}
        setInputValue={setInputValue}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Gallery
            images={images}
            imageType={imageType}
          />
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
}

export default App;
