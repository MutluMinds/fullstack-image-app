import React, { Suspense,lazy,useState, useEffect } from 'react';
import './App.scss';

const Loading = React.lazy(() => import (`./components/Loading/Loading`))
const Navbar = React.lazy(() => import (`./components/Navbar/Navbar`))
const Gallery = React.lazy(() => import (`./components/Gallery/Gallery`))
const SearchImage = React.lazy(() => import (`./components/SearchImage/SearchImage`))
const getImages = React.lazy(() => import (`./utils/getImage`))
const getSearchedImages = React.lazy(() => import (`./utils/getImage`))

function App() {
  const [imageType, setImageType] = useState('gifs');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const receivedImages = await getImages(imageType);

      setImages(receivedImages);
      setIsLoading(false);
    }
    ;
    fetchData();
  }, [imageType]);

  function handleChange(value) {
    setInputValue('');
    setImageType(value);
  }

  async function switchImagesProvider(searchTerm) {
    setInputValue(searchTerm);
    setIsLoading(true);

    if (searchTerm) {
      try {
        const formattedSearchTerm = searchTerm.replace(/[^a-zA-Z ]/g, "");
        const receivedImages = await getSearchedImages(imageType, formattedSearchTerm);

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

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}> 
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
          : <Gallery images={images} imageType={imageType} />
      }
      </Suspense>
    </div>
  );
}

export default App;
