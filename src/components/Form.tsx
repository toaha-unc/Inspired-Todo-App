import * as http from "../HttpCalls";
import { FieldValues, useForm } from "react-hook-form";
import "../App.css";

interface Props {
  addTodo: (todo: http.Todo) => void;
  addQuote: (quote: http.Quote) => void;
}

function Form({ addTodo, addQuote }: Props) {
  const todo_form = useForm();
  const quote_form = useForm();

  const onSubmitTodo = async (data: FieldValues) => {
    const todo = await http.createTodo({
      id: 0,
      title: data.todo,
      completed: false,
      user_id: parseInt(localStorage.getItem("user_id")!),
    });
    addTodo(todo);
    const todo_input = document.getElementById("todo") as HTMLInputElement;
    todo_input.value = "";
  };
  const onSubmitQuote = async (data: FieldValues) => {
    const quote = await http.createQuote({
      id: 0,
      quote: data.quote,
      user_id: parseInt(localStorage.getItem("user_id")!),
    });
    addQuote(quote);
    const quote_input = document.getElementById("quote") as HTMLInputElement;
    quote_input.value = "";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(174,128,205)",
        paddingTop: "45px",
        paddingBottom: "45px",
        paddingLeft: "20px",
        paddingRight: "20px",
        margin: "0",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "60px",
          flex: 1,
        }}
      >
        <input
          {...todo_form.register("todo")}
          type="text"
          className="form-control input-field"
          id="todo"
          placeholder="What do you need to do?"
          style={{
            marginRight: "20px",
            flex: 1,
            height: "80px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "20px",
          }}
        />
        <button
          type="button"
          className="btn btn-light form-button"
          onClick={todo_form.handleSubmit(onSubmitTodo)}
          style={{
            height: "80px",
            fontFamily: "Helvetica, sans-serif",
            borderRadius: "20px",
          }}
        >
          Add task
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        <input
          {...quote_form.register("quote")}
          type="text"
          className="form-control input-field"
          id="quote"
          placeholder="Give yourself inspiring words!"
          style={{
            marginRight: "20px",
            flex: 1,
            height: "80px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "20px",
          }}
        />
        <button
          type="button"
          className="btn btn-light form-button"
          onClick={quote_form.handleSubmit(onSubmitQuote)}
          style={{
            height: "80px",
            fontFamily: "Helvetica, sans-serif",
            borderRadius: "20px",
          }}
        >
          Add quote
        </button>
      </div>
    </div>
  );
}

export default Form;
