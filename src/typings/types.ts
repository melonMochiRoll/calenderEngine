
export type InputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export type TQueryStatus = 'error' | 'success' | 'loading';

export interface IUser {
  id: string;
  email: string;
  createdAt: Date;
  deletedAt: Date;
};

export type TLocalTodo = {
  id: string;
  contents: string;
  isComplete: boolean;
  createdAt: Date;
};

export type TTodo = {
  id: number,
  contents: string,
  isComplete: boolean,
  date: Date,
  UserId: number,
};