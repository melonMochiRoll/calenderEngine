import { Todos } from "src/entities/Todos";
import { Users } from "src/entities/Users";

export type UsersWithoutPassword = Pick<Users, 'id' | 'email' | 'createdAt' | 'deletedAt'>;

export type todosWithoutUserId = Pick<Todos, 'id' | 'contents' | 'date'>;