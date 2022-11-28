import React, { useRef, useState, useEffect } from "react";
import "./SearchImage.scss";

const SearchImage = ({ onChange, setInputValue, value }) => {
  const searchRef = useRef();
  const [isSearchBarFull, setSearchBarFull] = useState(true);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchTerm = searchRef.current.value;
    onChange(searchTerm);
  }

  const isSticky = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 20) {
      setSearchBarFull(false);
    } else {
      setSearchBarFull(true);
    }
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
        className={isSearchBarFull ? `form-style-one` : `form-style-second`}
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
