import { FormEvent, useState } from "react";
import { Quote } from "../../HttpCalls";
import * as http from "../../HttpCalls";

interface Props {
  quote: Quote;
  deleteQuote: (id: number) => void;
  updateQuote: (quote: Quote) => void;
}

function ListItemQuote({ quote, deleteQuote, updateQuote }: Props) {
  const [visibile, setVisibility] = useState(false);
  const [input, setInput] = useState(quote.quote);

  const handleOnClick = (id: number) => {
    http.deleteQuote(id);
    deleteQuote(id);
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    http.updateQuote(quote.id, input);
    updateQuote({ id: quote.id, quote: input, user_id: quote.user_id });
    setVisibility(false);
  };

  return (
    <li className="li-with-bullet">
      <span style={{ flex: 1 }}>
        {!visibile && <span>{quote.quote}</span>}
        {visibile && (
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="form-control"
              defaultValue={quote.quote}
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
          onClick={() => handleOnClick(quote.id)}
          style={{ borderRadius: "20px" }}
        >
          delete
        </button>
      </div>
    </li>
  );
}

export default ListItemQuote;
