import React from "react";

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

const GalleryTabs = ({ onTabClick, activeTab }) => {

  return (<>
    <ul className="gallery-tabs">
      {Object.values(GALLERY_TABS).map((tab, index) => (<li key={index} className="gallery-tab">
        <button onClick={() => onTabClick(tab.id)}>
          {tab.label}
          <div className={activeTab === tab.id ? "gallery-tab--active" : null} />
        </button>
      </li>))}
    </ul>
  </>
  );
};

export default GalleryTabs;
