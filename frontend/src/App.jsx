import React, { useState, useEffect } from "react";
import { IMAGE_TYPE_GIFS } from "./static/constants/imageTypes";

import useGetImages from "./hooks/useGetImages";

import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./components/Gallery/Gallery";
import SearchImage from "./components/SearchImage/SearchImage";
import Corner from "./components/Corner/Corner";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";

function App() {
  const [imageType, setImageType] = useState(IMAGE_TYPE_GIFS);

  const { images, setImages, isLoading, fetchImages, offset, setOffset } =
    useGetImages(imageType);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageType]);

  function handleNavbarChange(value) {
    setInputValue("");
    setImageType(value);
    setInitialOffsetValue(value);
  }

  async function switchImagesProvider(searchTerm) {
    setInputValue(searchTerm);
    fetchImages(searchTerm);
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
            setImages={setImages}
            imageType={imageType}
            inputValue={inputValue}
            offset={offset}
            setOffset={setOffset}
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
