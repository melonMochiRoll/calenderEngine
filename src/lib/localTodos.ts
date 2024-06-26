import dayjs from "dayjs";
import { getItem, getKeys, setItem } from "./localStorage";
import { nanoid } from "nanoid";

export const getLocalTodos = (date: string) => {
  return getItem(date);
};

export const createLocalTodos = (
  contents: string,
  date: string,
) => {
  try {
    const newTodo = {
      id: nanoid(6),
      contents: contents.trim(),
      isComplete: false,
      date: dayjs(date).toDate(),
    };

    const todos = getItem(date);

    if (todos) {
      todos.push(newTodo);
      setItem(date, todos);
      return todos;
    }
    
    const newTodos = [newTodo];

    setItem(date, newTodos);
    return newTodos;
  } catch (e) {
    console.error(e);
  }
};

export const shiftLocalTodos = (
  todosId: string,
  isComplete: boolean,
  date: string,
) => {
  try {
    const todos = getItem(date);

    const idx = todos.findIndex((todo: any) => todo.id === todosId);
    todos[idx].isComplete = Boolean(!isComplete);
  
    setItem(date, todos);
    return todos;
  } catch (e) {
    console.error(e);
  }
};

export const deleteLocalTodos = (
  todosId: string,
  date: string,
) => {
  try {
    const todos = getItem(date);

    const newTodos = todos.filter((item: any) => item.id !== todosId);

    setItem(date, newTodos);
    return newTodos;
  } catch (e) {
    console.error(e);
  }
};

export const getLocalTodosList = (date: string) => {
  const localStoragekeys = getKeys();

  const [ year, month, _] = date.split('-');
  const pattern = `${year}-${month}`;

  const todosList =
    localStoragekeys
      .filter(key => key.startsWith(pattern))
      .reduce((acc: any, key: string) => {
        const partialContents =
          getItem(key)
            .slice(0, 3)
            .map((item: any) => item.contents);

        acc[key] = {
          partialContents,
        };
        return acc;
      }, {});
    
  return todosList;
};