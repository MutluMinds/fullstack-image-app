import React, { useState, useEffect } from "react";
import {
  IMAGE_TYPE_GIFS,
  DEFAULT_GIPHY_OFFSET
} from "./static/constants";
import { getImages, getNewOffset, getDefaultOffset } from "./utils";

import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./components/Gallery/Gallery";
import StickyBar from "./components/StickyBar/StickyBar";
import Corner from "./components/Corner/Corner";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";

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
      const newOffset = getNewOffset(imageType, defaultOffset);
      setImages(receivedImages);
      setOffset(newOffset);
      setIsLoading(false);
    });
  }, [imageType]);

  function handleNavbarChange(value) {
    setInputValue("");
    setImageType(value);
    setInitialOffsetValue(value);
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
      <div className="page">
        <StickyBar
          imageType={imageType}
          setIsLoading={setIsLoading}
          setInputValue={setInputValue}
          setImages={setImages}
          setOffset={setOffset}
          inputValue={inputValue}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Gallery images={images} imageType={imageType} />
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
    </div>
  );
}

export default App;
