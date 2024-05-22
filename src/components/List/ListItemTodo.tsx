import { FormEvent, useState } from "react";
import { Todo } from "../../HttpCalls";
import * as http from "../../HttpCalls";

interface Props {
  todo: Todo;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

function ListItemTodo({ todo, deleteTodo, updateTodo }: Props) {
  const [visibile, setVisibility] = useState(false);
  const [input, setInput] = useState(todo.title);
  const [isStruckThrough, setIsStruckThrough] = useState(todo.completed);

  const handleOnClick = (id: number) => {
    http.deleteTodo(id);
    deleteTodo(id);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updated = {
      id: todo.id,
      title: input,
      completed: todo.completed,
      user_id: todo.user_id,
    };
    http.updateTodo(todo.id, updated);
    updateTodo(updated);
    setVisibility(false);
  };

  const handleSlash = () => {
    const updated = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
      user_id: todo.user_id,
    };
    http.updateTodo(todo.id, updated);
    updateTodo(updated);
    setIsStruckThrough(!isStruckThrough);
  };

  return (
    <li className="li-with-bullet">
      <span style={{ flex: 1 }}>
        {!visibile && (
          <span
            onClick={handleSlash}
            style={{
              textDecoration: isStruckThrough ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.title}
          </span>
        )}
        {visibile && (
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="form-control"
              defaultValue={todo.title}
              onChange={(event) => setInput(event.target.value)}
            />
          </form>
        )}
      </span>
      <div>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setVisibility(true)}
          style={{ borderRadius: "20px", marginRight: "10px" }}
        >
          edit
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => handleOnClick(todo.id)}
          style={{ borderRadius: "20px" }}
        >
          delete
        </button>
      </div>
    </li>
  );
}

export default ListItemTodo;
