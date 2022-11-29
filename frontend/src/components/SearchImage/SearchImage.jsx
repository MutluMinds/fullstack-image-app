import React, { useRef, useState, useEffect } from "react";
import { scrollTopY } from "../../utils/script";
import "./SearchImage.scss";

const SearchImage = ({ onChange, setInputValue, value }) => {
  const searchRef = useRef();
  const [isSearchBarFull, setSearchBarFull] = useState(false);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchTerm = searchRef.current.value;
    onChange(searchTerm);
  }

  const isSticky = () => {
    const scrollTop = window.scrollY;
    setSearchBarFull(scrollTop <= scrollTopY);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => isSticky());

    return () => {
      window.removeEventListener("scroll", () => isSticky());
    };
  });

  return (
    <div className="search_input-wrapper">
      <form
        onSubmit={handleSearchSubmit}
        className={isSearchBarFull ? `search-bar-md'` : `search-bar-lg`}
      >
        <input
          ref={searchRef}
          value={value}
          onChange={(e) => setInputValue(e.target.value)}
          className="search_input"
          type="text"
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default SearchImage;
