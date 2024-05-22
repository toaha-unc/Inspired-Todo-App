import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import { Todo, Quote, User } from "./todo.mjs";

const app = express();
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.post("/todos", async (req, res) => {
  const todo = await Todo.create(req.body);
  if (!todo) {
    res.status(400).send("Invalid todo data");
  } else {
    res.status(201).json(todo.json());
  }
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.findAll();
  res.status(200).json(todos.map((todo) => todo.json()));
});

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404).send("Todo not found");
  } else {
    res.status(200).json(todo.json());
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedData = {};

    if (typeof req.body.title === "string" && req.body.title.trim() !== "") {
      updatedData.title = req.body.title.trim();
    }

    if (typeof req.body.completed === "boolean") {
      updatedData.completed = req.body.completed;
    }

    if (Object.keys(updatedData).length === 0) {
      res.status(400).send("No valid fields to update");
      return;
    }

    const updatedTodo = await Todo.updateById(todoId, updatedData);

    if (!updatedTodo) {
      res.status(404).send("Todo not found");
    } else {
      res.status(200).json(updatedTodo.json());
    }
  } catch (error) {
    console.error("Failed to update todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/todos/:id", async (req, res) => {
  const success = await Todo.deleteById(req.params.id);
  if (!success) {
    res.status(404).send("Todo not found");
  } else {
    res.status(204).send();
  }
});

app.post("/todos/reset-db", async (req, res) => {
  const success = await Todo.resetDatabase();
  if (!success) {
    res.status(500).send("Failed to reset database");
  } else {
    res.send("Todos database reset successfully");
  }
});

app.post("/quotes", async (req, res) => {
  const quote = await Quote.create(req.body);
  if (!quote) {
    res.status(400).send("Invalid quote data");
  } else {
    res.status(201).json(quote.json());
  }
});

app.get("/quotes", async (req, res) => {
  const quotes = await Quote.findAll();
  res.status(200).json(quotes.map((quote) => quote.json()));
});

app.get("/quotes/:id", async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) {
    res.status(404).send("Quote not found");
  } else {
    res.status(200).json(quote.json());
  }
});

app.put("/quotes/:id", async (req, res) => {
  if (typeof req.body.quote !== "string" || req.body.quote.trim() === "") {
    res.status(400).send("Invalid quote data");
    return;
  }
  const updatedQuote = await Quote.updateById(
    req.params.id,
    req.body.quote.trim(),
  );
  if (!updatedQuote) {
    res.status(404).send("Quote not found or unable to update");
  } else {
    res.status(200).json(updatedQuote.json());
  }
});

app.delete("/quotes/:id", async (req, res) => {
  const success = await Quote.deleteById(req.params.id);
  if (!success) {
    res.status(404).send("Quote not found");
  } else {
    res.status(204).send();
  }
});

app.post("/quotes/reset-db", async (req, res) => {
  const success = await Quote.resetDatabase();
  if (!success) {
    res.status(500).send("Failed to reset quotes database");
  } else {
    res.send("Quotes database reset successfully");
  }
});

app.post("/user", async (req, res) => {
  const success = await User.create(req.body);
  if (!success) {
    res.status(400).send("Could not create user");
  } else {
    res.status(201).json(success.json());
  }
});

app.get("/user", async (req, res) => {
  const { username, password } = req.query;
  const success = await User.userExists({ username, password });
  if (!success) {
    res.status(400).send("Could not find user");
  } else {
    let s = success.json();
    res.status(200).json(s.id);
  }
});

app.get("/user/:id", async (req, res) => {
  const success = await User.getByID(parseInt(req.params.id));
  if (!success) {
    res.status(400).send("Could not find user");
  } else {
    res.status(201).json(success.json());
  }
});

app.post("/user/reset-db", async (req, res) => {
  const quoteSuccess = await Quote.resetDatabase();
  const todoSuccess = await Todo.resetDatabase();
  const userSuccess = await User.resetDatabase();
  if (!quoteSuccess || !todoSuccess || !userSuccess) {
    res.status(500).send("Failed to reset quotes database");
  } else {
    res.send("Users reset, all tables dropped");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
