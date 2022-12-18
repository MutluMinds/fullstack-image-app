import React, { useState } from "react";

const SearchImage = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchSubmit(e) {
    e.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <div className="search_input-wrapper">
      <form onSubmit={handleSearchSubmit}>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search_input"
          type="text"
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default SearchImage;
