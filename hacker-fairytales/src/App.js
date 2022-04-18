import React from 'react'

const storiesReducer = (state, action) => {
  switch(action.type){
    case 'REMOVE_STORY':
      return state.data.filter(
        story => story.objectID !== action.payload.objectID
      );
    case 'STORIES_LOADING':
      return {
        ...state,
        isLoading:true,
        isError:false,
      }
    case 'STORIES_LOADED':
      return {
        ...state,
        isLoading:false,
        isError:false,
        data:action.payload
      }
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading:false,
        isError:true,
      };
    default:
      throw new Error();
  }
}

const useSemiPersistentHook = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key)||initialState)

  React.useEffect(()=>{
    localStorage.setItem(key, value)
  },[value, key])

  return [value, setValue]
};

const API_ENDPOINT = 'http://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentHook('search', 'react')
  // const [stories, setStories] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false)
  const [stories, dispactchStories] = React.useReducer(storiesReducer, {data: [], isLoading: false, isError:false});

  // const getAsyncStories = () =>
  //   new Promise(resolve =>
  //     setTimeout(
  //       () => resolve({data: {stories : initialStories}}),
  //       2000
  //     )
  //   )


  React.useEffect(()=>{
    // setIsLoading(true)
    if(!searchTerm) return;

    dispactchStories({
      type: 'STORIES_LOADING'
    });
    
    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then(response => response.json())
      .then(result => {
        dispactchStories({
          type:'STORIES_LOADED',
          payload:result.hits,
        });
      })
      .catch(()=>
        dispactchStories({
          type:'STORIES_FETCH_FAILURE'
        }));}
 , [searchTerm]);

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
  }


  const handleRemoveStory = item => {
    dispactchStories({
      type: 'REMOVE_STORY',
      payload: item,
    })
  }


  return(
    <div>
      <h1>My hacker fairytales</h1>
      <InputWithLabel value={searchTerm} onInputChange={handleSearch} id='search'  type='text' isFocused={false}>
       <strong>Search :</strong>
      </InputWithLabel>
       {/* <InputWithLabel onInputChange={handleSearch} value={searchTerm} id='search2'  type='text' isFocused>
       <strong>Search2 :</strong>
      </InputWithLabel> */}
      <hr/>
      {stories.isError && <p>Something went wrong ....</p>}
      {stories.isLoading ? (<p>Loading....</p>) : (<List list={stories.data} onRemoveItem={handleRemoveStory} />)}

    </div>
  );
}

const InputWithLabel = ({id, type, value, onInputChange, isFocused, children}) => {
  // const [searchTerm, setSearchTerm] = React.useState('')
  // const handleChange = event => {
  //   setSearchTerm(event.target.value)
  //   props.onSearch(event)
  // }
  // const {search, onSearch} = props;

  const inputRef = React.useRef();

  React.useEffect(()=>{
    if(isFocused && inputRef.current){
      inputRef.current.focus()
    }
  },[isFocused])

  return(
    <>
      <label htmlFor={id}>{children} :</label>
      <input type={type} id={id} onChange={onInputChange} value={value} ref={inputRef} />
      <p>Currently Searching for <strong>{value}</strong></p>
    </>
  );
}

const List = ({list, onRemoveItem}) =>
    list.map(item => {
          return(
            <Item item={item} key={item.objectID} onRemoveItem={onRemoveItem}/>
          )
        })

const Item = ({item, onRemoveItem}) => {

  // const handleRemoveItem = () => {
  //   onRemoveItem(item)
  // }

  return (
    <div>
      <a href={item.url}>
        {item.title}
      </a>
      <span>{item.author}</span>
      <span>{item.nbr_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type='button' onClick={()=>onRemoveItem(item)}>
          Remove
        </button>
      </span>
    </div>
  )
}
export default App;
