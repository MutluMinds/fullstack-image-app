import React, { useRef } from "react";


const SearchImage = ({ onChange, setInputValue, value }) => {
  const searchRef = useRef();

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchTerm = searchRef.current.value;
    onChange(searchTerm);
  }

  return (
    <div className="search_input-wrapper">
      <form
        onSubmit={handleSearchSubmit}
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
