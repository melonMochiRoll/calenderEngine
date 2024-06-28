
export type InputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export interface IUser {
  id: string;
  email: string;
  createdAt: Date;
  deletedAt: Date;
};

export type ILocalTodo = {
  id: string;
  contents: string;
  isComplete: boolean;
  date: Date;
};

export type TTodo = {
  id: number,
  contents: string,
  isComplete: boolean,
  date: Date,
  UserId: number,
};