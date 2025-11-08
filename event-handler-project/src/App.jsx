import { useState } from 'react';
import TodoForm from './TodoForm';   // ✅ Added missing import
import TodoList from './TodoList';   // ✅ Added missing import
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (taskText) => {
    const newTask = {
      id: Date.now(), // current time and date as unique id
      text: taskText, // task description
      completed: false, // task completion status
    }
    setTasks((prev) => [...prev, newTask]); // add new task to existing tasks
  }

  const deleteTaskHandler = (id) => {
    setTasks(tasks.filter((t) => t.id !== id)); // filter out the task with the given id
  }

  return (
    <div className="app-container">
      <h1>Smart TO-DO List</h1>
      <TodoForm onAddTask={addTaskHandler} />

      {tasks.length > 0 ? (
        <TodoList 
          tasks={tasks} 
          onDelete={deleteTaskHandler}
        />
      ) : (
        <p className="empty">No tasks available. Please add a task.</p>
      )}
    </div>
  );
};

export default App;