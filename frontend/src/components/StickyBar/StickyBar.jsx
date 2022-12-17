import React, { useState, useEffect } from "react";

import SearchImage from "../SearchImage/SearchImage";
import ScrollButton from "../ScrollTopButton/ScrollTopButton";

const SCROLL_TOP_Y = 30;

const StickyBar = ({ setInputValue }) => {
  const [sticky, setSticky] = useState(false);

  const isSticky = () => {
    const windownTopY = window.scrollY;
    setSticky(windownTopY > SCROLL_TOP_Y);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  return (
    <div className="sticky-wrapper">
      <SearchImage onSearch={(searchTerm) => setInputValue(searchTerm)} />
      {sticky ? <ScrollButton /> : null}
    </div>
  );
};

export default StickyBar;
