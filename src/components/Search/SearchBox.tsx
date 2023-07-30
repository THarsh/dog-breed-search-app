import React from "react";
import "./SearchBox.scss";

function SearchBox({ onChange, handleSubmit }: any) {
  return (
    <div className="search-box-wrapper">
      <p>Search</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto"
        autoComplete="off"
      >
        <input
          className="form-control"
          type="text"
          name="search"
          placeholder="Search.."
          onChange={onChange}
          autoComplete="off"
          autoFocus
        />
      </form>
      <button onClick={handleSubmit}>GO</button>
    </div>
  );
}

export default SearchBox;
