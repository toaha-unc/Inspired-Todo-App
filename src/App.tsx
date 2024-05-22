import { useEffect, useState } from "react";
import Form from "./components/Form";
import ListGroup from "./components/List/ListGroup";
import { Quote, Todo, getQuotes, getTodos } from "./HttpCalls";
import Popup from "./components/Popup";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [user, setUser] = useState(-1);

  // load user
  const loadUser = (id: number) => setUser(id);

  // create new Todo and Quote
  const addTodo = (todo: Todo) => setTodos([...todos, todo]);
  const addQuote = (quote: Quote) => setQuotes([...quotes, quote]);

  // delete Todo and Quote
  const deleteTodo = (id: number) => {
    const new_todos = [...todos];
    setTodos(new_todos.filter((todo) => todo.id !== id));
  };
  const deleteQuote = (id: number) => {
    const new_quotes = [...quotes];
    setQuotes(new_quotes.filter((quote) => quote.id !== id));
  };

  // Update Todo and Quote
  const updateTodo = (todo: Todo) => {
    const new_todos = [...todos];
    new_todos.forEach((e, i) => {
      if (e.id === todo.id) new_todos[i] = todo;
    });
    setTodos(new_todos);
  };
  const updateQuote = (quote: Quote) => {
    const new_quotes = [...quotes];
    new_quotes.forEach((e, i) => {
      if (e.id === quote.id) new_quotes[i] = quote;
    });
    setQuotes(new_quotes);
  };

  // load data on page load
  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(
          res.filter((todo) => {
            return todo.user_id === parseInt(localStorage.getItem("user_id")!);
          })
        );
      })
      .catch((error) => console.log(error));

    getQuotes()
      .then((res) => {
        setQuotes(
          res.filter((quote) => {
            return quote.user_id === parseInt(localStorage.getItem("user_id")!);
          })
        );
      })
      .catch((error) => console.log(error));
  }, [user]);

  return (
    <div className="app-container">
      <Popup loadUser={loadUser} />
      <Form addTodo={addTodo} addQuote={addQuote} />
      <ListGroup
        todos={todos}
        quotes={quotes}
        deleteTodo={deleteTodo}
        deleteQuote={deleteQuote}
        updateTodo={updateTodo}
        updateQuote={updateQuote}
      />
    </div>
  );
}

export default App;
