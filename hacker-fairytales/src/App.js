import React from 'react'

// const title = "idriss"
// const welcome = {
//   greeting : 'Hey',
//   title : 'idriss',
// }
// function getTitle(title){
//   return title
// }
// const nbr = 5
// const list = [{
//   title:'react',
//   url:'https://reactjs.org/',
//   author:'jordan',
//   points:4,
//   objectID:0
// },
// {
//   title:'angular',
//   url:'https://angular.org/',
//   author:'cobe',
//   points:3,
//   objectID:1
// }]

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
const App = () => {

   const initialStories = [
    {title:'React',
    url:'https://reactjs.org',
    author:'jordan',
    points:5,
    nbr_comments:20,
    objectID:0
  },
    {title:'Vue ',
    url:'https://Vuejs.org',
    author:'martin',
    points:4,
    nbr_comments:10,
    objectID:1
  },
  {
    title:'Angular',
    url:'https://angular.org',
    author:'omar',
    points:5,
    nbr_comments:50,
    objectID:2
  },
  { 
    title:'Gatsby ',
    url:'https://gatsby.org',
    author:'fernando',
    points:3,
    nbr_comments:10,
    objectID:3
  },
  { 
    title:'Laravel',
    url:'https://laravel.org',
    author:'joe',
    points:3,
    nbr_comments:31,
    objectID:4
  },
  {
    title:'Vim ',
    url:'https://vim.org',
    author:'martin',
    points:5,
    nbr_comments:45,
    objectID:5
  },
  ]

  const [searchTerm, setSearchTerm] = useSemiPersistentHook('search', 'react')
  // const [stories, setStories] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false)
  const [stories, dispactchStories] = React.useReducer(storiesReducer, {data: [], isLoading: false, isError:false});

  const getAsyncStories = () =>
    new Promise(resolve => 
      setTimeout(
        () => resolve({data: {stories : initialStories}}),
        2000
      )
    )


  React.useEffect(()=>{
    // setIsLoading(true)
    dispactchStories({
      type: 'STORIES_LOADING'
    });
    getAsyncStories().then(result => {
      // setStories(result.data.stories);
      dispactchStories({
        type: 'STORIES_LOADED',
        payload: result.data.stories,
      })
      // setIsLoading(false)
    }).catch(()=>
          dispactchStories({type:'STORIES_FETCH_FAILURE'}));
  }, []);

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
      console.log(searchedStories);
  }

  const handleRemoveStory = item => {
    dispactchStories({
      type: 'REMOVE_STORY',
      payload: item,
    })
  }

  const searchedStories = stories.data.filter(story=>{
    return story.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
  })

  return(
    <div>
      <h1>My hacker fairytales</h1>
      <InputWithLabel onInputChange={handleSearch} value={searchTerm} id='search'  type='text' isFocused={false}>
       <strong>Search :</strong> 
      </InputWithLabel>
       {/* <InputWithLabel onInputChange={handleSearch} value={searchTerm} id='search2'  type='text' isFocused>
       <strong>Search2 :</strong> 
      </InputWithLabel> */}
      <hr/>
      {stories.isError && <p>Something went wrong ....</p>}
      {stories.isLoading ? (<p>Loading....</p>) : (<List list={searchedStories} onRemoveItem={handleRemoveStory} />)}
       
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
