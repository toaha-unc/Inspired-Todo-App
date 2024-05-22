import axios from "axios";

const BASE_URL = "http://localhost:3000";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user_id: number;
}

export interface Quote {
  id: number;
  quote: string;
  user_id: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

// Todos
export async function getTodos() {
  return (await axios.get(`${BASE_URL}/todos`)).data as Todo[];
}

export async function getTodoByID(id: number) {
  return (await axios.get(`${BASE_URL}/todos/${id}`)).data as Todo;
}

export async function createTodo(todo: Todo) {
  return (await axios.post(`${BASE_URL}/todos`, todo)).data as Todo;
}

export async function updateTodo(id: number, todo: Todo) {
  return await axios.put(`${BASE_URL}/todos/${id}`, todo);
}

export async function deleteTodo(id: number) {
  return await axios.delete(`${BASE_URL}/todos/${id}`);
}

// Quotes
export async function getQuotes() {
  return (await axios.get(`${BASE_URL}/quotes`)).data as Quote[];
}

export async function getQuoteByID(id: number) {
  return (await axios.get(`${BASE_URL}/quotes/${id}`)).data as Quote;
}

export async function createQuote(quote: Quote) {
  return (await axios.post(`${BASE_URL}/quotes`, quote)).data as Quote;
}

export async function updateQuote(id: number, quote: string) {
  return await axios.put(`${BASE_URL}/quotes/${id}`, { quote: quote });
}

export async function deleteQuote(id: number) {
  return await axios.delete(`${BASE_URL}/quotes/${id}`);
}

// Users
export async function checkUserExists(user: User) {
  return (
    await axios.get(
      `${BASE_URL}/user?username=${user.username}&password=${user.password}`
    )
  ).data as number;
}

export async function createUser(user: User) {
  return (await axios.post(`${BASE_URL}/user`, user)).data as User;
}

// Random task
export async function getTask() {
  try {
    const getRandEvent = await fetch(`http://www.boredapi.com/api/activity/`);
    const getRandEventId = await getRandEvent.json();
    const response = await fetch(
      `http://www.boredapi.com/api/activity?key=${getRandEventId.key}`
    );
    if (!response.ok) {
      throw new Error("Could not fetch activity");
    }
    const test = await response.json();

    const activityTodo = test.activity;
    //quotes.textContent = `${activityTodo}`;
    return activityTodo;
  } catch (error) {
    console.error("Could not call api");
    return null;
  }
}
