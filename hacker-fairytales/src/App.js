import React from "react";
import axios from "axios";
import "./App.css";

import { ReactComponent as Logo } from "./hacker.svg";

import List from "./List.js";
import SearchForm from "./SearchForm.js";

const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

const extractSearchTerm = (url) =>
  url
    .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
    .replace(PARAM_SEARCH, "");

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

const getUrl = (searchTerm, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

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
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page,
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
    page: 0,
    isLoading: false,
    isError: false,
  });
  const [urls, setUrls] = React.useState([getUrl(searchTerm, stories.page)]);

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
        payload: {
          list: result.data.hits,
          page: result.data.page,
        },
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
    const url = getUrl(searchTerm, 0);
    setUrls(urls.concat(url));
    event.preventDefault();
  };

  const handleRemoveStory = React.useCallback((item) => {
    dispactchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }, []);

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const url = getUrl(searchTerm, 0);
    setUrls(urls.concat(url));
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    const url = getUrl(searchTerm, stories.page + 1);
    setUrls(urls.concat(url));
  };
  return (
    <div className="bg-black text-lime-700">
      <div className="container mx-auto">
        <Logo className="w-10 h-10 fill-lime-700" />

        <h1 className="text-5xl">
          My.HackerFairytales
          {/* with {sumComments} comments */}
        </h1>

        {/* <InputWithLabel onInputChange={handleSearch} value={searchTerm} id='search2'  type='text' isFocused>
       <strong>Search2 :</strong>
      </InputWithLabel> */}
        <div className="flex justify-center ">
          <SearchForm
            searchTerm={searchTerm}
            onSearchSubmit={handleSearchSubmit}
            onSearchInput={handleSearchInput}
          />
        </div>
        <div className="mb-10">
          <LastSearches
            lastSearches={lastSearches}
            onLastSearch={handleLastSearch}
          />
        </div>

        <List list={stories.data} onRemoveItem={handleRemoveStory} />

        {stories.isError && <p>Something went wrong ....</p>}
        {stories.isLoading ? (
          <p>Loading....</p>
        ) : (
          <button type="button" onClick={handleMore}>
            More
          </button>
        )}
      </div>
    </div>
  );
};
const LastSearches = ({ lastSearches, onLastSearch }) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={searchTerm + index}
        type="button"
        onClick={() => onLastSearch(searchTerm)}
        className="border-4 border-lime-700 mr-4 px-4 rounded"
      >
        {searchTerm}
      </button>
    ))}
  </>
);
export default App;
