import React from "react";

function SearchBox({ searchValue, onChange }: any) {
  return (
    <div className="search-box-wrapper">
      <input
        className="form-control"
        type="text"
        name="search"
        placeholder="Search dog breed.."
        onChange={onChange}
        autoComplete="off"
        autoFocus
        value={searchValue}
      />
    </div>
  );
}

export default SearchBox;
