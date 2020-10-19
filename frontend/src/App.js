import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar/Navbar';
import Gallery from './components/Gallery/Gallery';
import SearchImage from './components/SearchImage/SearchImage';
import { getImages, getSearchedImages } from './utils/getImage';

function App() {
  const [imageType, setImageType] = useState('gifs');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      const receivedImages = await getImages(imageType);

      setImages(receivedImages);
      setIsLoading(false);
    }
    ;
    fetchData();
  }, [imageType]);

  function handleChange(value) {
    setIsLoading(true);
    setInputValue('');
    setImageType(value);
  }

  async function handleSearch(searchTerm) {
    changeSearchValue();
    setIsLoading(true);

    if(searchTerm) {
      try {
        const receivedImages = getSearchedImages(imageType, searchTerm);
        
        setImages(receivedImages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const receivedImages = await getImages(imageType);

    setImages(receivedImages);
    setIsLoading(false);
  }

  function changeSearchValue(newValue) {
    setInputValue(newValue);
  }

  return (
    <div className="App">
      <Navbar
        onChange={(value) => handleChange(value)}
        value={imageType} />
      <SearchImage 
        onChange={(searchTerm) => handleSearch(searchTerm)} 
        value={inputValue} 
        setInputValue={setInputValue} />
      { !isLoading && <Gallery images={images} imageType={imageType} />}
    </div>
  );
}

export default App;
