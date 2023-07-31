import React from "react";
import "./SearchBox.scss";

function SearchBox({ onChange, handleSubmit }: any) {
  return (
    <div className="search-box-wrapper">
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          className="form-control"
          type="text"
          name="search"
          placeholder="Search dog breed.."
          onChange={onChange}
          autoComplete="off"
          autoFocus
        />
      </form>
    </div>
  );
}

export default SearchBox;
