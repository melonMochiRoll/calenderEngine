
export type InputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export type TQueryStatus = 'error' | 'success' | 'loading';

export const SharedspaceMembersRoles = {
  OWNER: 'owner',
  MEMBER: 'member',
  VIEWER: 'viewer',
};

export type TSharedspaceMembersRoles = typeof SharedspaceMembersRoles[keyof typeof SharedspaceMembersRoles];

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

export type TSharedspaceMembers = {
  SharedspaceId: number,
  UserId: number,
  createdAt: Date,
  role: TSharedspaceMembersRoles,
};

export type TSubscribedspaces = {
  Sharedspace: {
    name: string,
    url: string,
    private: boolean,
    Owner: {
      email: string
    },
  }
} & TSharedspaceMembers;