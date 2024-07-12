import { TLocalTodo } from "Typings/types";
import { getItem, getKeys, getValues, removeItem, setItem } from "./localStorage";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

const generateTodosKey = (date: string, id: string) => {
  return `${date}-${id}`;
};

export const getLocalTodos = (date: string) => {
  const todos =
    getKeys()
      .filter(key => key.includes(date))
      .map(key => getItem(key))
      .sort((a: TLocalTodo, b: TLocalTodo) => a.createdAt > b.createdAt ? 1 : -1);

  return todos;
};

export const createLocalTodos = (
  contents: string,
  date: string,
) => {
  try {
    const id = nanoid(6);
    const key = generateTodosKey(date, id);

    const newTodo: TLocalTodo = {
      id,
      contents,
      isComplete: false,
      date: new Date(date),
      createdAt: new Date(),
    };

    setItem(key, newTodo);
    return newTodo;
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
    const key = generateTodosKey(date, todosId);
    const todo = getItem(key);

    todo.isComplete = Boolean(!isComplete);
  
    setItem(key, todo);
    return todo;
  } catch (e) {
    console.error(e);
  }
};

export const deleteLocalTodos = (
  todosId: string,
  date: string,
) => {
  try {
    const key = generateTodosKey(date, todosId);
    
    removeItem(key);
    return true;
  } catch (e) {
    console.error(e);
  }
};

export const getLocalTodosList = (date: string) => {
  const [ year, month, _ ] = date.split('-');
  const pattern = `${year}-${month}`;

  const todosList =
    getKeys()
      .filter(key => key.includes(pattern))
      .map(key => getItem(key))
      .sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
      .reduce((acc, todo: TLocalTodo) => {
        const todosDate = dayjs(todo.date).format('YYYY-MM-DD');

        if (acc.hasOwnProperty(todosDate)) {
          acc[todosDate].partialContents.push(todo.contents);
          return acc;
        }

        acc[todosDate] = {
          partialContents: [ todo.contents ],
        };
        return acc;
      }, {});
    
  return todosList;
};

export const searchLocalTodos = async (
  query: string,
  offset: number = 0,
  limit: number = 10,
) => {
  const offsetIdx = offset * limit;
  const limitIdx = (offset + 1) * limit;

  try {
    return await new Promise<TLocalTodo[]>((res) => {
      const todos =
        getValues()
          .filter((todo: TLocalTodo) => todo.contents.includes(query))
          .sort((a, b) => a.date > b.date ? -1 : 1)
          .slice(offsetIdx, limitIdx);
      res(todos);
    });
  } catch (err: any) {
    throw new Error(err);
  }
};