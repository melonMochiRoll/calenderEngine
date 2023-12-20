import { Todos } from "src/entities/Todos";
import { Users } from "src/entities/Users";

export type UserWithoutPassword = Pick<Users, 'id' | 'email' | 'createdAt' | 'deletedAt'>;

export type TodosWithoutUserId = Pick<Todos, 'id' | 'contents' | 'date'>;

export type ProcessedTodos = {
  id: number,
  contents: string,
};