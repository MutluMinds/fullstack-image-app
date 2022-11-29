import React, { useRef, useState, useEffect } from "react";
import "./SearchImage.scss";

const SCROLL_TOP_Y = 20;

const SearchImage = ({ onChange, setInputValue, value }) => {
  const searchRef = useRef();
  const [isSearchBarFull, setIsSearchBarFull] = useState(false);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchTerm = searchRef.current.value;
    onChange(searchTerm);
  }

  const isSticky = () => {
    const windownTopY = window.scrollY;
    setIsSearchBarFull(windownTopY > SCROLL_TOP_Y);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  return (
    <div className="search_input-wrapper">
      <form
        onSubmit={handleSearchSubmit}
        className={isSearchBarFull ? 'search-bar-lg' : 'search-bar-md'}
      >
        <input
          ref={searchRef}
          value={value}
          onChange={e => setInputValue(e.target.value)}
          className="search_input"
          type="text"
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default SearchImage;
