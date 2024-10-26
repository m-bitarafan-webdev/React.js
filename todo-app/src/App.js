import React, { useState } from 'react';
//Here I imported the React module and the useState hook from the base react folder to use.
//App component and the return statement alongside the title was created
const App = () => {
  //App component was made and the return statement clarified
  const [todos, setTodos] = useState([]);
  //a state of todo list was set and a function to update it was defined by the empty array in useState hook
  const handleSubmit = (e) => {
    e.preventDefault();
    //Logic to add a new todo
    const newTodo = { id: Date.now(), text:  input ,completed: false };
    //an object of todo instance was made to include the properties related
    setTodos([...todos, newTodo])
  }
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What to-do next?"
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
    
  )
  //a single div contating an h1 header included
  //a form element with the type and placeholder and a condition to fill-in was created
  //added a submit button
}

export default App;
//I also exported the App component
//Nice changes have made and now I wanna push it to Github
//Second commit: this time I don't know how to connect the input section value to that of the todo object