import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export const GALLERY_TABS = {
  gallery: {
    id: "gallery",
    label: "GALLERY"
  },
  favourites: {
    id: "favourites",
    label: "FAVOURITES"
  }
};

const GalleryTabs = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState(GALLERY_TABS.gallery.id);
  const apiType = useLocation().pathname.substring(1);
  const { storage } = useLocalStorage(apiType, []);

  function handleTabClick(id) {
    setActiveTab(id);
    onTabClick(id, storage);
  }

  return (<>
    <ul className="gallery-tabs">
      {Object.values(GALLERY_TABS).map((tab, index) => (<li key={index} className="gallery-tab">
        <button onClick={() => handleTabClick(tab.id)}>
          {tab.label}
          <div className={activeTab === tab.id ? "gallery-tab--active" : null} />
        </button>
      </li>))}
    </ul>
  </>
  );
};

export default GalleryTabs;
