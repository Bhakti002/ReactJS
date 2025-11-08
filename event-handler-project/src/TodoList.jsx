import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onDelete }) => {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
