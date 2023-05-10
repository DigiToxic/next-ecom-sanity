"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
    setInputWidth(isInputVisible ? 0 : 200);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    console.log("Search query:", searchQuery);
    // Perform the search action here
  };

  return (
    <div className="search-box">
      <button className="search-icon" onClick={toggleInputVisibility}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          style={{ width: inputWidth }}
        />
      </form>
    </div>
  );
};

export default SearchInput;
