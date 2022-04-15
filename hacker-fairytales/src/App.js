import _ from 'lodash'
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
const App = () => {

  const [searchTerm, setSearchTerm] = React.useState('React')
  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
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
  }
  ]
  const searchedStories = stories.filter(story=>{
    return story.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
  })
  return(
    <div>
      <h1>My hacker fairytales</h1>
      <Search onSearch={handleSearch} search={searchTerm} />
      <hr/>
       <List list={searchedStories} />
    </div>
  );
}

const Search = (props) => {
  // const [searchTerm, setSearchTerm] = React.useState('')
  // const handleChange = event => {
  //   setSearchTerm(event.target.value)
  //   props.onSearch(event)
  // }
  return(
    <div>
      <label htmlFor='search'>Search :</label>
      <input type="text" id="search" onChange={props.onSearch} value={props.search}/>
      <p>Currently Searching for <strong>{props.search}</strong></p>
    </div>
  );
}



const List = (props) =>
    props.list.map( l => {
          return (
          <div key={l.objectID}>
            <span>
              <a href={l.url}>{l.title}</a>
            </span>
            <br/>
            <span>{l.author}</span>
            <br/> 
            <span>{l.points}</span>
          </div>
           )
        })


export default App;
