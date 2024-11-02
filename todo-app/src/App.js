import React, { useEffect, useState } from 'react';
import './App.css';
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
  //adding a new state to define prioroty
  const [priority, setPriority] = useState('');
  //adding a state for tags
  const [newTag, setNewTag] = useState("");
  //adding a selected tag state to filter based on the tags
  const [selectedTags, setSelectedTag] = useState([]);
  //adding a new state to keep track of want-to-get-tagged to-do item
  const [toEditTag, setToEditTag] = useState(null);
  //defining states of redo and undo histories
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  //adding a useEffect hook to load the stringified JSON from local storage and parse and update the value of todos
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos).map(todo => ({
        ...todo,
        reminder: todo.reminder ? new Date(todo.reminder) : null
      })));
    }
  }, []);  
  const [input, setInput] = useState('');
  //adding the input state 
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  //defined two state vairables to keep track of editing index and the edited content
  //using useEffect to bind the reminder feature
  useEffect(() => {
    const timeOuts = [];
  
    todos.forEach((todo) => {
      if (todo.reminder && todo.reminder instanceof Date && todo.reminder.getTime() > Date.now()) {
        const reminderTime = todo.reminder.getTime() - Date.now();
        const timeOutID = setTimeout(() => {
          alert(`Reminder: ${todo.text}`);
        }, reminderTime);
        timeOuts.push(timeOutID);
      }
    });
  
    return () => timeOuts.forEach((timeOutID) => clearTimeout(timeOutID));
  }, [todos]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //binding priority state to ensure the save
    setPriority(priority);
    //Logic to add a new todo
    const newTodo = { 
      id: Date.now(), 
      text:  input , 
      completed: false, 
      dueDate: dueDate, 
      dueTime: dueTime, 
      priorityStatus: priority, 
      tagList: [],
      reminder: dueDate && dueTime ? new Date (`${dueDate}T${dueTime}`) : null
    };
    //an object of todo instance was made to include the properties related
    setUndoHistory([...undoHistory, todos]);
    setTodos([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify(todos));
    //commiting to memory
    setInput('');    
    setPriority('None');
  }
  const deleteTodo = (id) => {
    //using the index of the array of todos, i filtered out the item that is selected and updated todos.
    const updatedTodos = todos.filter((todoItem) => todoItem.id !== id);
    //updating the todo list
    setUndoHistory([...undoHistory, todos]);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    //commiting deleted ones to memory
  }
  const editTodo = (id) => {
    //setting the index on the targeted item to edit
    const todoToEdit = todos.find((todo) => todo.id === id);
    setUndoHistory([...undoHistory, todos]);
    setEditingIndex(id);
    setEditedText(todoToEdit.text); //pre-fill the field with the current text
  }
  //setting the proper index of a todo to edit
  const saveTodo = (id) => {
    //binding priority state to ensure the save
    setPriority(priority);
    //maping the edited ones and adding them to the list
    const editedTodos = todos.map((todo) => 
    todo.id === id ? { 
      ...todo, 
      text: editedText, 
      completed: todo.completed, 
      dueDate: dueDate, 
      dueTime: dueTime, 
      priorityStatus: priority, 
    } : todo);
    setUndoHistory([...undoHistory, todos]);
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
    setUndoHistory([...undoHistory, todos]);
    //also removing the list from the memory
  }
  //defining the completion status function
  const toggleCompletion = (id) => {
    const toggledTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    //mapping over todos to find the toggled ones and changing the value
    setUndoHistory([...undoHistory, todos]);
    setTodos(toggledTodos);
    localStorage.setItem('todos', JSON.stringify(toggledTodos));
    //updating the list and commiting to memory
  }
  //configuring the filtered arrays
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    if (selectedTags.length !== 0) {
      return selectedTags.some(tag => todo.tagList.includes(tag));
    }
    return true;
  })
  //taglist creation
  const addTag = (todoID) => {
    if (newTag.trim()){
      setTodos((prevTodos) => 
        prevTodos.map((todo) => 
        todo.id === todoID ? {...todo, tagList: [...todo.tagList, newTag]} : todo
      ));
      setNewTag("");
      setUndoHistory([...undoHistory, todos]);
      setToEditTag(null);
    }
  }
  //to hide/show the input field for tags
  const showTagInput = (todoID) => {
    setToEditTag(todoID);
  }
  //tag remove function
  const removeTag = (todoID, tagToRemove) => {
    setTodos((prevTodos) => prevTodos.map((todo) => 
      todo.id === todoID ? { ...todo, tagList: todo.tagList.filter((tag) => tag !== tagToRemove )} : todo
    ));
    setUndoHistory([...undoHistory, todos]);
  }
  //adding tag filter function
  const toggleTag = (tag) => {
    setSelectedTag((prev) => 
    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
  )}


  //Adding the undo/redo functions
  const undoChanges = () => {
    if (undoHistory.length > 0) {
      const previousState = undoHistory[undoHistory.length - 1];
      setRedoHistory([...redoHistory, todos]);
      setTodos(previousState);
      setUndoHistory(undoHistory.slice(0, undoHistory.length - 1));
      localStorage.setItem('todos', JSON.stringify(previousState));
    }
  }


  const redoChanges = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1];
      setUndoHistory([...undoHistory, todos]);
      setTodos(nextState);
      setRedoHistory(redoHistory.slice(0, redoHistory.length - 1));
      localStorage.setItem('todos', JSON.stringify(nextState));
    }
  }



  //binding the value of the input field with the state
  return (
    <div>
      <h1>Todo App</h1>
      <button onClick={resetTodos}>Clear the list</button>
      <button onClick={undoChanges} disabled={undoHistory.length === 0}>Undo</button>
      <button onClick={redoChanges} disabled={redoHistory.length === 0}>Redo</button>

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
        <label>Set the priority</label>
        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="None">None</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
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
                <label>Set the priority</label>
                <select value={priority}  onChange={(e) => setPriority(e.target.value)}>
                  <option value="None">None</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button onClick={() => saveTodo(todo.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                {todo.text}
                {todo.reminder && (
                  <p>Reminder: {todo.reminder.toLocaleString()}</p>
                )}
                {todo.dueDate && (
                  <p>Due Date: {todo.dueDate}</p>
                )}
                {todo.dueTime && (
                  <p>Due Time: {todo.dueTime}</p>
                )}
                {todo.priorityStatus && todo.priorityStatus !== 'None' && (
                  <p>Priority: {todo.priorityStatus}</p>
                )}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => editTodo(todo.id)}>Edit</button>
                <div>
                  {todo.tagList.map((tag, index) => (
                    <span key={index}
                    onClick={() => toggleTag(tag)}
                    style={{cursor: 'pointer', marginRight: '5px', color: selectedTags.includes(tag) ? 'blue' : 'black'}}
                    >
                      {tag}
                      <button onClick={(e) => { e.stopPropagation(); removeTag(todo.id, tag);}}>Remove Tag</button>
                    </span>
                  ))}
                </div>
                {toEditTag === todo.id && (<input
                  type='text'
                  value={newTag}
                  placeholder='Add a tag: Work, Personal, ...'
                  onChange={(e) => setNewTag(e.target.value)}
                />)}
                <button onClick={() => (toEditTag === todo.id ? addTag(todo.id) : showTagInput(todo.id))}>
                  {toEditTag === todo.id ? "Add another tag" : "Add a tag"}
                </button>
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
//added priority level feature
//minor bugs fixed in priority level
//tag creation and sorting added
//reminder added
//bugs in priority, tags, reminder have been taken care of
//redo/undo feature added