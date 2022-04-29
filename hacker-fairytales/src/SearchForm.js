import React from "react";
import InputWithLabel from "./InputWithLabel";

const SearchForm = ({ searchTerm, onSearchSubmit, onSearchInput }) => {
  return (
    <form onSubmit={onSearchSubmit} className="mb-10">
      <InputWithLabel
        value={searchTerm}
        onInputChange={onSearchInput}
        id="search"
        type="text"
        isFocused={false}
      ></InputWithLabel>
      <button
        type="submit"
        className="border-double border-4 rounded-full border-indigo-600 mx-4 p-2"
        disabled={!searchTerm}
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
