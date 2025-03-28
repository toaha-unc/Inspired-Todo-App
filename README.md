##### *COMP426 Final Project*

## Video of App


https://github.com/user-attachments/assets/2e5c1743-b804-4e39-b5fa-58096c293213



# Inspired Todos

Created by [Toaha Siddique](https://github.com/toaha-unc), [Keon Marcus](https://github.com/KeonM), [Evan Murray](https://github.com/evanesce345)

## Project Overview

This project implements a simple Todo List application with the ability to create, edit and delete todos as well as inspirational quotes provided by the user. It also features a sign-in system so users can see only data specific to themselves. The application is powered by Node.js and Vite, using a React/TypeScript-based frontend, and a backend featuring a RESTful API built with Express. The backend connects to a SQLite database, and allows for management of todos, quotes, and user data. The frontend is a responsive web application allowing users to manage their todos and quotes interactively. There is also the Bored 3rd party API for fetching random tasks.

### Key Features

- A front end that is interactive and event-driven (input fields with buttons for submitting, editing and deleting tasks or quotes and striking through tasks. Responses also popup).
- A back end that serves two resources (Tasks and Quotes) with a RESTful CRUD (create, read, update, and delete) API.
- Uses the Bored 3rd party API for fetching random tasks.
- Uses session-persistent state by authenticating the user and then having user-specific data, including account creation.
- A pleasing user experience which is easy to use and has a professional design (button colors change when clicking, linear gradient as color, same purple white theme throughout).

### Technologies Used

- **Frontend:** React (TypeScript), Bootstrap, Vite
- **Backend:** Node.js, Express
- **Database:** SQLite

## Project Structure

```plaintext
/
├─ backend/
│  ├─ server.mjs              - Main server file with API endpoints.
│  └─ todo.mjs                - Models and database interactions.
├─ src/
│  ├─ App.tsx                 - Main React application file.
│  ├─ main.tsx                - Entry point for the React app.
│  ├─ components/             - Reusable React components.
│  └─ HttpCalls.tsx           - API calls to the backend.
└─ package.json               - Node dependencies and scripts.
```

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/toaha-unc/Inspired-Todo-App.git
cd Inspired-Todo-App
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run start
```

This command runs the backend server and frontend web application simultaneously.

## Usage

1. **Open your web browser** and go to `http://localhost:5173`.
2. **User Management:** Sign up and log in to manage user-specific todos and quotes.
3. **Manage Todos and Quotes:** Use the web interface to add, delete, and edit todos and quotes. Fetch tasks through the 3rd party API.

## API Endpoints

- `POST /todos`: Create a new todo.
- `GET /todos`: Fetch all todos.
- `GET /todos/:id`: Fetch a single todo by ID.
- `PUT /todos/:id`: Update a todo by ID.
- `DELETE /todos/:id`: Delete a todo by ID.

- `POST /quotes`: Create a new quote.
- `GET /quotes`: Fetch all quotes.
- `GET /quotes/:id`: Fetch a single quote by ID.
- `PUT /quotes/:id`: Update a quote by ID.
- `DELETE /quotes/:id`: Delete a quote by ID.

- `POST /user`: Create a new user.
- `GET /user`: Fetch a user by credentials.
- `GET /user/:id`: Fetch a user by ID.
