import React from "react";
import "./SearchBox.scss";

function SearchBox({doSearch}:any) {
  return (
    <div className="search-box-wrapper">
      <p>Search</p>
      <input
        className="form-control"
        type="text"
        name="search"
        placeholder="Search.."
        onChange={doSearch}
        autoComplete="off"
        autoFocus
      />
      <button>GO</button>
    </div>

  );
}

export default SearchBox;
