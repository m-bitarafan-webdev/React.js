import React, { useEffect, useState } from 'react';
//Here I imported the React module and the useState hook from the base react folder to use.
//App component and the return statement alongside the title was created
const App = () => {
  //App component was made and the return statement clarified
  const [todos, setTodos] = useState([]);
  //a state of todo list was set and a function to update it was defined by the empty array in useState hook
  //adding a state variable to add a filter feature
  const [filter, setFilter] = useState('all');
  //adding a new state to keep track of date and time
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  //adding a useEffect hook to load the stringified JSON from local storage and parse and update the value of todos
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [])
  const [input, setInput] = useState('');
  //adding the input state 
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  //defined two state vairables to keep track of editing index and the edited content
  const handleSubmit = (e) => {
    e.preventDefault();
    //Logic to add a new todo
    const newTodo = { id: Date.now(), text:  input ,completed: false, dueDate: dueDate, dueTime: dueTime };
    //an object of todo instance was made to include the properties related
    setTodos([...todos, newTodo])
    localStorage.setItem('todos', JSON.stringify(todos));
    //commiting to memory
    setInput('');
  }
  const deleteTodo = (id) => {
    //using the index of the array of todos, i filtered out the item that is selected and updated todos.
    const updatedTodos = todos.filter((todoItem) => todoItem.id !== id);
    //updating the todo list
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    //commiting deleted ones to memory
  }
  const editTodo = (id) => {
    //setting the index on the targeted item to edit
    const todoToEdit = todos.find((todo) => todo.id === id)
    setEditingIndex(id);
    setEditedText(todoToEdit.text); //pre-fill the field with the current text
  }
  //setting the proper index of a todo to edit
  const saveTodo = (id) => {
    //maping the edited ones and adding them to the list
    const editedTodos = todos.map((todo) => 
    todo.id === id ? { ...todo, text: editedText} : todo)
    setTodos(editedTodos); //update the todo list with edited ones
    setEditingIndex(null); //clear the index of edit
    setEditedText(''); // clear the editing field
    localStorage.setItem('todos', JSON.stringify(editedTodos));
    //commiting the edited ones
  }
  //adding the cancel-edit feature
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedText('');
  };
  //adding a reset function to clear the todos
  const resetTodos = () => {
    setTodos([]);
    //clearing the set
    localStorage.removeItem('todos');
    //also removing the list from the memory
  }
  //defining the completion status function
  const toggleCompletion = (id) => {
    const toggledTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    //mapping over todos to find the toggled ones and changing the value
    setTodos(toggledTodos);
    localStorage.setItem('todos', JSON.stringify(toggledTodos));
    //updating the list and commiting to memory
  }
  //configuring the filtered arrays
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true;
  })
  //binding the value of the input field with the state
  return (
    <div>
      <h1>Todo App</h1>
      <button onClick={resetTodos}>Clear the list</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What to-do next?"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      <ul>
        {filteredTodos.map(todo => (
          <div>
            <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
            />
              {editingIndex === todo.id ? (
                <>
                <input
                  type='text'
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => saveTodo(todo.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                {todo.text}
                {todo.dueDate && (
                  <p>Due Date: {todo.dueDate}</p>
                )}
                {todo.dueTime && (
                  <p>Due Time: {todo.dueTime}</p>
                )}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => editTodo(todo.id)}>Edit</button>
                </>
              )}
            </li>
          </div>
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
//binded the input value to the li items successfully using useState for input
//created the delete button to remove the items from list by using the array method of filter and referring to the index
//editing feature added to the functionality
//tags of input and save/edit buttons added as a contiditional rendering
//local storing and completion status added
//filtering feature added
//added due time and date feature