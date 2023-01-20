import React, { useState, useEffect } from "react";
import { LIMIT } from "../static/constants";
import { useLocation } from "react-router-dom";
import { getDefaultOffset, getImages } from "../utils";
import useLocalStorage from "../hooks/useLocalStorage";

import Loading from "../components/Loading/Loading";
import Gallery from "../components/Gallery/Gallery";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";
import GalleryInfo from "../components/Gallery/GalleryInfo/GalleryInfo";
import GalleryTabs, { GALLERY_TABS } from "../components/GalleryTabs/GalleryTabs";
import SearchImage from "../components/SearchImage/SearchImage";
import ScrollButton from "../components/ScrollTopButton/ScrollTopButton";

const GalleryPage = () => {
  const apiType = useLocation().pathname.substring(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState(GALLERY_TABS.gallery.id);
  const [inputValue, setInputValue] = useState("");

  const { 
    storage: favImages,
    setStorage: setFavImages 
  }  = useLocalStorage(apiType, []);

  useEffect(() => {
    setIsLoading(true);
    setActiveTab(GALLERY_TABS.gallery.id);
    const defaultOffset = getDefaultOffset(apiType);

    getImages(apiType, defaultOffset, inputValue)
      .then((receivedImages) => {
        setImages(receivedImages);
        setIsLoading(false);
      });
  }, [apiType, inputValue]);

  useEffect(() => {
    return () => {
      setInputValue("");
    };
  }, []);

  function handleTabClick(id) {
    setActiveTab(id);

    if (id === GALLERY_TABS.gallery.id) {
      setIsLoading(true);
      const defaultOffset = getDefaultOffset(apiType);

      getImages(apiType, defaultOffset, inputValue)
        .then((receivedImages) => {
          setImages(receivedImages);
          setIsLoading(false);
        });
    }

    if (id === GALLERY_TABS.favourites.id) {
      setImages(favImages.slice(0, LIMIT));
    }
  }

  return (
    <div className="page">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <GalleryTabs onTabClick={(id, storage) => handleTabClick(id, storage)} />
          {
            activeTab === GALLERY_TABS.gallery.id 
              ? <SearchImage onSearch={searchTerm => setInputValue(searchTerm)} />
              : null
          }
          <GalleryInfo inputValue={inputValue} setInputValue={setInputValue} activeTab={activeTab} />
          <Gallery 
            activeTab={activeTab}
            images={images} 
            favImages={favImages} 
            setFavImages={setFavImages} 
          />
          {images.length >= LIMIT ? <LoadMoreButton
            apiType={apiType}
            inputValue={inputValue}
            activeTab={activeTab}
            afterLoad={(newImages) => setImages(images => [...images, ...newImages])}
          /> : null}
          <ScrollButton />
        </>
      )}
    </div>
  );
};

export default GalleryPage;
