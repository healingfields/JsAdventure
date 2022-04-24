import React from "react";
import InputWithLabel from "./InputWithLabel";

const SearchForm = ({ searchTerm, onSearchSubmit, onSearchInput }) => {
  return (
    <form onSubmit={onSearchSubmit} className="search_form">
      <InputWithLabel
        value={searchTerm}
        onInputChange={onSearchInput}
        id="search"
        type="text"
        isFocused={false}
      >
        <strong>Search :</strong>
      </InputWithLabel>
      <button
        type="submit"
        disabled={!searchTerm}
        className="button button_large"
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
