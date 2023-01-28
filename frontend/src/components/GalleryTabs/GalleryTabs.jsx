import React, { useState } from "react";

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

  function handleTabClick(id) {
    setActiveTab(id);
    onTabClick(id);
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
