import React, { useState } from 'react';
//Here I imported the React module and the useState hook from the base react folder to use.
//App component and the return statement alongside the title was created
const App = () => {
  //App component was made and the return statement clarified
  const [todos, setTodos] = useState([]);
  //a state of todo list was set and a function to update it was defined by the empty array in useState hook
  return (
    <div>
      <h1>Todo App</h1>
      <form>
        <input
        type="text"
        placeholder="What to-do next?"
        required
        />
      </form>
    </div>
    
  )
  //a single div contating an h1 header included
  //a form element with the type and placeholder and a condition to fill-in was created
}

export default App;
//I also exported the App component