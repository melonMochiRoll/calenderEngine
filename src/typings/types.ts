
export type InputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export type TQueryStatus = 'error' | 'success' | 'loading';

export type TUser = {
  id: string,
  email: string,
  createdAt: Date,
  deletedAt: Date,
};

export type TLocalTodo = {
  id: string,
  contents: string,
  isComplete: boolean,
  date: Date,
  createdAt: Date,
};

export type TTodo = {
  id: number,
  description: string,
  startTime: string,
  endTime: string,
  date: string,
  AuthorId: number,
  EditorId: number | null,
  SharedspaceId: number,
};