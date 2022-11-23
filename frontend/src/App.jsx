import React, { useState, useEffect } from 'react';

import './App.scss';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';
import Gallery from './components/Gallery/Gallery';
import SearchImage from './components/SearchImage/SearchImage';
import { getImages, getSearchedImages } from './utils/getImage';

function App() {
  const [imageType, setImageType] = useState('gifs');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [limit, ] = useState(20);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const receivedImages = await getImages(imageType, limit, offset);

      setImages(receivedImages);
      updateOffsetValue();
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
        const receivedImages = await getSearchedImages(imageType, formattedSearchTerm, limit, offset);

        setImages(receivedImages);
        updateOffsetValue();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const receivedImages = await getImages(imageType, limit, offset);

    setImages(receivedImages);
    updateOffsetValue();
    setIsLoading(false);
  }

  const loadMoreImages = async () => {
    if (inputValue) {
      try {
        const formattedSearchTerm = inputValue.replace(/[^a-zA-Z ]/g, "");
        const receivedImages = await getSearchedImages(imageType, formattedSearchTerm, limit, offset);

        setImages([...images, ...receivedImages]);
        updateOffsetValue();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const receivedImages = await getImages(imageType, limit, offset);

    setImages([...images, ...receivedImages]);
    updateOffsetValue();
  }

  const setInitialOffsetValue = (value) => {
    value === 'gifs' ? setOffset(0) : setOffset(1);
  }

  const updateOffsetValue = () => {
    imageType === 'gifs' ? setOffset(offset + limit + 1) : setOffset(offset + 1);
  }

  return (
    <div className="App">
      <Navbar
        onChange={(value) => handleChange(value)}
        value={imageType} />
      <SearchImage
        onChange={(searchTerm) => switchImagesProvider(searchTerm)}
        value={inputValue}
        setInputValue={setInputValue} />
      {
        isLoading
          ? <Loading />
          : <Gallery images={images} imageType={imageType} loadMoreImages={loadMoreImages} />
      }
    </div>
  );
}

export default App;
