import React, { useState, useEffect } from 'react';

import Navbar from './components/navbar/navbar';
import SearchViewer from './components/searchViewer/searchViewer';
const axios = require('axios');

function App() {
  const [imageType, setImageType] = useState('gifs');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:5000/${imageType}`);
      const propertyName = imageType === 'gifs' ? 'data' : 'hits'
      setImages(response.data[propertyName]);
      setIsLoading(false);
    }
    ;
    fetchData();
  }, [imageType]);

  function handleChange(value) {
    setIsLoading(true);
    setImageType(value);
  }

  return (
    <div className="App">
      <Navbar
        onChange={(value) => handleChange(value)}
        value={imageType} />
      { !isLoading && <SearchViewer images={images} imageType={imageType} /> }
    </div>
  );
}

export default App;
