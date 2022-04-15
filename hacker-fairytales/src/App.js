import _, { set } from 'lodash'
import React from 'react'
import { isTemplateExpression } from 'typescript'

const title = "idriss"
const welcome = {
  greeting : 'Hey',
  title : 'idriss',
}
function getTitle(title){
  return title
}
const nbr = 5
const list = [{
  title:'react',
  url:'https://reactjs.org/',
  author:'jordan',
  points:4,
  objectID:0
},
{
  title:'angular',
  url:'https://angular.org/',
  author:'cobe',
  points:3,
  objectID:1
}]

const useSemiPersistentHook = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key)||initialState)

  React.useEffect(()=>{
    localStorage.setItem(key, value)
  },[value, key])

  return [value, setValue]
};
const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentHook('search', 'react')

  // React.useEffect(()=>{
  //   console.log('happened');
  // localStorage.setItem('search', searchTerm)
  // },[searchTerm])

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
      console.log(searchedStories);
  }

  const stories = [
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
  const searchedStories = stories.filter(story=>{
    return story.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
  })

  return(
    <div>
      <h1>My hacker fairytales</h1>
      <InputWithLabel onInputChange={handleSearch} value={searchTerm} id='search' label='Search :' type='text'/>
      <hr/>
       <List list={searchedStories} />
    </div>
  );
}

const InputWithLabel = ({id, label, type, value, onInputChange}) => {
  // const [searchTerm, setSearchTerm] = React.useState('')
  // const handleChange = event => {
  //   setSearchTerm(event.target.value)
  //   props.onSearch(event)
  // }
  // const {search, onSearch} = props;
  return(
    <>
      <label htmlFor={id}>{label} :</label>
      <input type={type} id={id} onChange={onInputChange} value={value}/>
      <p>Currently Searching for <strong>{value}</strong></p>
    </>
  );
}

const List = (props) =>
    props.list.map(item => {
          return(
            <Item item={item} key={item.objectID}/>
          )
        })

const Item = ({item}) => {
  return (
    <div>
      <a href={item.url}>
        {item.title}
      </a>
      <span>{item.author}</span>
      <span>{item.nbr_comments}</span>
      <span>{item.points}</span>
    </div>
  )
}
export default App;
