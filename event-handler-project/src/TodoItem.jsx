const TodoItem = ({ id, text, completed, onDelete }) => {
  return (
    <div className={'todo-item ${completed ? "completed" : ""}'}>
        <span>{text}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
