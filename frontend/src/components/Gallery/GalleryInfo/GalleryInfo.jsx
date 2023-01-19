import React from "react";
import Badge from "../../Badge/Badge";
import { GALLERY_TABS } from "../../GalleryTabs/GalleryTabs";

const GalleryInfo = ({ inputValue, setInputValue, activeTab }) => {

  function getText() {
    if (activeTab === GALLERY_TABS.favourites.id) {
      return <h1>Favourites</h1>;
    }

    if (activeTab === GALLERY_TABS.gallery.id && !inputValue) {
      return <h1>Trending</h1>;
    }

    return <div className="d-flex align-items-center gap-2">
      <h1 className="d-inline-block">Search Results for</h1>
      <Badge inputValue={inputValue} onClick={() => setInputValue("")} />
    </div>; 
  }

  return (
    <>
      {getText()}
    </>
  );
};

export default GalleryInfo;
