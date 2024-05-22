import { db } from "./db.mjs";

export class User {
  #id;
  #username;
  #password;

  constructor(id, username, password) {
    this.#id = id;
    this.#username = username;
    this.#password = password;
  }

  static async create(data) {
    if (
      !data ||
      typeof data.username !== "string" ||
      data.username.trim() === "" ||
      typeof data.password !== "string" ||
      data.password.trim() === ""
    ) {
      return null;
    }

    try {
      const newUser = await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [data.username.trim(), data.password.trim()],
          function (err) {
            if (err) reject(err);
            else resolve(this);
          },
        );
      });
      return new User(
        newUser.lastID,
        data.username.trim(),
        data.password.trim(),
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getByID(id) {
    if (typeof id !== "number" || id < 0) {
      return null;
    }

    try {
      const row = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE user_id = ?", [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
      if (row) {
        return new User(row.id, row.username, row.password);
      }
      return null;
    } catch (error) {
      console.error("User not found");
      return null;
    }
  }

  static async userExists(data) {
    if (
      !data ||
      typeof data.username !== "string" ||
      typeof data.password !== "string" ||
      data.username.trim() === "" ||
      data.password.trim() === ""
    ) {
      return null;
    }

    try {
      const row = await new Promise((resolve, reject) => {
        db.get(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          [data.username, data.password],
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          },
        );
      });
      if (row) {
        return new User(row.user_id, row.username, row.password);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  json() {
    return {
      id: this.#id,
      username: this.#username,
      password: this.#password,
    };
  }

  static async resetDatabase() {
    try {
      await new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run("DROP TABLE IF EXISTS users", function (err) {
            if (err) reject(err);
          });
          db.run(
            "CREATE TABLE users (username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, user_id INTEGER PRIMARY KEY AUTOINCREMENT)",
            function (err) {
              if (err) reject(err);
              else resolve();
            },
          );
        });
      });
      return true;
    } catch (error) {
      console.error("Failed to reset database:", error);
      return false;
    }
  }
}

export class Todo {
  #id;
  #title;
  #completed;
  #user_id;

  constructor(id, title, completed = false, user_id) {
    this.#id = id;
    this.#title = title;
    this.#completed = completed;
    this.#user_id = user_id;
  }

  static async create(data) {
    if (
      !data ||
      typeof data.title !== "string" ||
      data.title.trim() === "" ||
      typeof data.user_id !== "number"
    ) {
      return null;
    }

    try {
      const stmt = await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)",
          [data.title.trim(), data.completed || false, data.user_id],
          function (err) {
            if (err) reject(err);
            else resolve(this);
          },
        );
      });
      return new Todo(
        stmt.lastID,
        data.title.trim(),
        data.completed || false,
        data.user_id,
      );
    } catch (error) {
      console.error("Failed to create a new todo:", error);
      return null;
    }
  }

  static async findAll() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM todos", [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      return rows.map(
        (row) => new Todo(row.id, row.title, row.completed, row.user_id),
      );
    } catch (error) {
      console.error("Failed to retrieve todos:", error);
      return [];
    }
  }

  static async findById(id) {
    try {
      const row = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM todos WHERE id = ?", [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
      if (row) {
        return new Todo(row.id, row.title, row.completed, row.user_id);
      }
      return null;
    } catch (error) {
      console.error("Failed to retrieve todo:", error);
      return null;
    }
  }

  static async updateById(id, updatedData) {
    try {
      const setClause = Object.keys(updatedData)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = [...Object.values(updatedData), id];

      await new Promise((resolve, reject) => {
        db.run(
          `UPDATE todos SET ${setClause} WHERE id = ?`,
          values,
          function (err) {
            if (err) reject(err);
            else resolve(this);
          },
        );
      });

      const updatedTodo = await Todo.findById(id);
      return updatedTodo;
    } catch (error) {
      console.error("Failed to update todo:", error);
      return null;
    }
  }

  static async deleteById(id) {
    try {
      await new Promise((resolve, reject) => {
        db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
          if (err) reject(err);
          else resolve(this);
        });
      });
      return true;
    } catch (error) {
      console.error("Failed to delete todo:", error);
      return false;
    }
  }

  json() {
    return {
      id: this.#id,
      title: this.#title,
      completed: this.#completed,
      user_id: this.#user_id,
    };
  }

  static async resetDatabase() {
    try {
      await new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run("DROP TABLE IF EXISTS todos", function (err) {
            if (err) reject(err);
          });
          db.run(
            "CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, completed BOOLEAN NOT NULL DEFAULT 0, user_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(user_id))",
            function (err) {
              if (err) reject(err);
              else resolve();
            },
          );
        });
      });
      return true;
    } catch (error) {
      console.error("Failed to reset database:", error);
      return false;
    }
  }
}

export class Quote {
  #id;
  #quote;
  #user_id;

  constructor(id, quote, user_id) {
    this.#id = id;
    this.#quote = quote;
    this.#user_id = user_id;
  }

  static async create(data) {
    if (
      !data ||
      typeof data.quote !== "string" ||
      data.quote.trim() === "" ||
      typeof data.user_id !== "number"
    ) {
      return null;
    }

    try {
      const stmt = await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO quotes (quote, user_id) VALUES (?, ?)",
          [data.quote.trim(), data.user_id],
          function (err) {
            if (err) reject(err);
            else resolve(this);
          },
        );
      });
      return new Quote(stmt.lastID, data.quote.trim(), data.user_id);
    } catch (error) {
      console.error("Failed to create a new quote:", error);
      return null;
    }
  }

  static async findAll() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM quotes", [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      return rows.map((row) => new Quote(row.id, row.quote, row.user_id));
    } catch (error) {
      console.error("Failed to retrieve quotes:", error);
      return [];
    }
  }

  static async findById(id) {
    try {
      const row = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM quotes WHERE id = ?", [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
      if (row) {
        return new Quote(row.id, row.quote, row.user_id);
      }
      return null;
    } catch (error) {
      console.error("Failed to retrieve quote:", error);
      return null;
    }
  }

  static async updateById(id, quote) {
    try {
      await new Promise((resolve, reject) => {
        db.run(
          "UPDATE quotes SET quote = ? WHERE id = ?",
          [quote, id],
          function (err) {
            if (err) reject(err);
            else resolve(this);
          },
        );
      });
      return new Quote(id, quote);
    } catch (error) {
      console.error("Failed to update quote:", error);
      return null;
    }
  }

  static async deleteById(id) {
    try {
      await new Promise((resolve, reject) => {
        db.run("DELETE FROM quotes WHERE id = ?", [id], function (err) {
          if (err) reject(err);
          else resolve(this);
        });
      });
      return true;
    } catch (error) {
      console.error("Failed to delete quote:", error);
      return false;
    }
  }

  json() {
    return {
      id: this.#id,
      quote: this.#quote,
      user_id: this.#user_id,
    };
  }

  static async resetDatabase() {
    try {
      await new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run("DROP TABLE IF EXISTS quotes", function (err) {
            if (err) {
              reject(err);
            } else {
              console.log("Quotes table dropped");
            }
          });
          db.run(
            "CREATE TABLE quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, quote TEXT NOT NULL, user_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(user_id))",
            function (err) {
              if (err) {
                reject(err);
              } else {
                console.log("Quotes table created");
                resolve();
              }
            },
          );
        });
      });
      return true;
    } catch (error) {
      console.error("Failed to reset quotes database:", error);
      return false;
    }
  }
}
