import { Quote, Todo } from "../../HttpCalls";
import ListItemTodo from "./ListItemTodo";
import ListItemQuote from "./ListItemQuote";
import Task from "../Task";
import Signout from "../Signout";
import "../../App.css";

interface Props {
  todos: Todo[];
  quotes: Quote[];
  deleteTodo: (id: number) => void;
  deleteQuote: (id: number) => void;
  updateTodo: (todo: Todo) => void;
  updateQuote: (quote: Quote) => void;
}

function ListGroup({
  todos,
  quotes,
  deleteTodo,
  deleteQuote,
  updateTodo,
  updateQuote,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
          marginRight: "70px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "18px",
          height: "541px",
          overflowY: "auto",
        }}
      >
        {todos.map((todo) => (
          <ListItemTodo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "18px",
            height: "206px",
            overflowY: "auto",
          }}
        >
          {quotes.map((quote) => (
            <ListItemQuote
              key={quote.id}
              quote={quote}
              deleteQuote={deleteQuote}
              updateQuote={updateQuote}
            />
          ))}
        </div>
        <br />
        <Task />
        <br />
        <div style={{ alignSelf: "flex-end" }}>
          <br />
          <br />
          <br />
          <Signout />
        </div>
      </div>
    </div>
  );
}

export default ListGroup;
