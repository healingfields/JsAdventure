import React from "react";
import axios from "axios";
import "./App.css";

import List from "./List.js";
import SearchForm from "./SearchForm.js";

const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query=";

const extractSearchTerm = (url) => url.replace(API_ENDPOINT, "");

const getLastSearches = (urls) =>
  urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);
      if (index === 0) {
        return result.concat(searchTerm);
      }
      const previousSearchTerm = result[result.length - 1];
      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1);

const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;

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
  const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  const lastSearches = getLastSearches(urls);

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
      const result = await axios.get(urls[urls.length - 1]);

      dispactchStories({
        type: "STORIES_LOADED",
        payload: result.data.hits,
      });
    } catch {
      dispactchStories({
        type: "STORIES_FETCH_FAILURE",
      });
    }
  }, [urls]);

  React.useEffect(() => {
    // setIsLoading(true)
    console.log(urls[urls.length - 1]);
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
    event.preventDefault();
    console.log("wo");
  };

  const handleRemoveStory = React.useCallback((item) => {
    dispactchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }, []);

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

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
      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
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
const LastSearches = ({ lastSearches, onLastSearch }) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={searchTerm + index}
        type="button"
        className="button"
        style={{ marginBottom: "15px", marginRight: "5px" }}
        onClick={() => onLastSearch(searchTerm)}
      >
        {searchTerm}
      </button>
    ))}
  </>
);
export default App;
