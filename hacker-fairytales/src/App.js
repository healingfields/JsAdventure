import React from "react";
import axios from "axios";
import "./App.css";

import List from "./List.js";
import SearchForm from "./SearchForm.js";

const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query=";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_STORY":
      return {
        isLoading: false,
        isError: false,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID
        ),
      };
    case "STORIES_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_LOADED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useSemiPersistentHook = (key, initialState) => {
  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const getSumComments = (stories) => {
  console.log("C");
  return stories.data.reduce((result, value) => result + value.num_comments, 0);
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentHook("search", "react");
  // const [stories, setStories] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false)
  const [stories, dispactchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  // const getAsyncStories = () =>
  //   new Promise(resolve =>
  //     setTimeout(
  //       () => resolve({data: {stories : initialStories}}),
  //       2000
  //     )
  //   )
  const handleFetchStories = React.useCallback(async () => {
    dispactchStories({
      type: "STORIES_LOADING",
    });

    try {
      const result = await axios.get(url);

      dispactchStories({
        type: "STORIES_LOADED",
        payload: result.data.hits,
      });
    } catch {
      dispactchStories({
        type: "STORIES_FETCH_FAILURE",
      });
    }
  }, [url]);

  React.useEffect(() => {
    // setIsLoading(true)
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  const handleRemoveStory = React.useCallback((item) => {
    dispactchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }, []);

  return (
    <div className="container">
      <h1 className="headline">
        My hacker fairytales with {sumComments} comments
      </h1>

      {/* <InputWithLabel onInputChange={handleSearch} value={searchTerm} id='search2'  type='text' isFocused>
       <strong>Search2 :</strong>
      </InputWithLabel> */}
      <SearchForm
        searchTerm={searchTerm}
        onSearchSubmit={handleSearchSubmit}
        onSearchInput={handleSearchInput}
      />

      {stories.isError && <p>Something went wrong ....</p>}
      {stories.isLoading ? (
        <p>Loading....</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
