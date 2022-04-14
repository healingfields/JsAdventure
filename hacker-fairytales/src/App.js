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
  const handleChange = event => {
    console.log(event.target.value);
  }
  return(
    <div>
      <h1>My hacker fairytales</h1>
      <label htmlFor='search'>Search :</label>
      <input type="text" id="search" onChange={handleChange}/>
      <hr/>
       <List/>
    </div>
  );
}


const List = () =>
    list.map( l => {
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
