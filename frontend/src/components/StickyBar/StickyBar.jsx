import React from "react";
import SearchImage from "../SearchImage/SearchImage";

const StickyBar = ({ onSearch }) => {
  return (
    <div className="sticky-wrapper">
      <SearchImage onSearch={onSearch} />
    </div>
  );
};

export default StickyBar;
