import { useState } from "react";

const TodoForm = ({ onAddTask }) => {
  const [TaskText, setTaskText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault()  // close the refresh 
    if (TaskText.trim() === "") {
      alert("Please enter a task")
    } else {
      onAddTask(TaskText)
    }
    setTaskText("")
  };

  return (
    <form onSubmit={submitHandler} className="tofo-form">
      <input
        type="text"
        placeholder="Enter Your Task...."
        value={TaskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default TodoForm;
