import React, { useState, useEffect } from 'react';

import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';
import Gallery from './components/Gallery/Gallery';
import SearchImage from './components/SearchImage/SearchImage';
import { getImages, getSearchedImages } from './utils/getImage';
import Corner from './components/Corner/Corner';

export const LIMIT = 20;
export const IMAGE_TYPE_GIFS = 'gifs';
export const IMAGE_TYPE_IMAGES = 'images';
const DEFAULT_GIPHY_OFFSET = 0;
const DEFAULT_PIXABAY_OFFSET = 1;

function App() {
  const [imageType, setImageType] = useState(IMAGE_TYPE_GIFS);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [offset, setOffset] = useState(DEFAULT_GIPHY_OFFSET);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const defaultOffset = imageType === IMAGE_TYPE_GIFS ? DEFAULT_GIPHY_OFFSET : DEFAULT_PIXABAY_OFFSET;
      const receivedImages = await getImages(imageType, LIMIT, defaultOffset);

      setImages(receivedImages);
      setOffset(prevOffset => imageType === IMAGE_TYPE_GIFS ? prevOffset + LIMIT + 1 : prevOffset + 1);
      setIsLoading(false);
    };

    fetchData();
  }, [imageType]);

  function handleChange(value) {
    setInputValue('');
    setImageType(value);
    setInitialOffsetValue(value);
  }

  async function switchImagesProvider(searchTerm) {
    setInputValue(searchTerm);
    setIsLoading(true);

    if (searchTerm) {
      try {
        const formattedSearchTerm = searchTerm.replace(/[^a-zA-Z ]/g, "");
        const receivedImages = await getSearchedImages(imageType, formattedSearchTerm, LIMIT, offset);

        setImages(receivedImages);
        updateOffsetValue();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const receivedImages = await getImages(imageType, LIMIT, offset);

    setImages(receivedImages);
    updateOffsetValue();
    setIsLoading(false);
  }

  const setInitialOffsetValue = (value) => {
    value === IMAGE_TYPE_GIFS ? setOffset(0) : setOffset(1);
  }

  const updateOffsetValue = () => {
    imageType === IMAGE_TYPE_GIFS ? setOffset(offset + LIMIT + 1) : setOffset(offset + 1);
  }

  return (
    <div className="App">
      <Navbar onChange={(value) => handleChange(value)} value={imageType} />
      <Corner />
      <SearchImage
        onChange={(searchTerm) => switchImagesProvider(searchTerm)}
        value={inputValue}
        setInputValue={setInputValue}
      />
      {isLoading ? (
        <div style={{ marginTop: "50px" }}>
          <Loading />
        </div>
      ) : (
        <Gallery
          images={images}
          setImages={setImages}
          imageType={imageType}
          inputValue={inputValue}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}

export default App;
