
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

export type TSharedspace = {
  id: number,
  name: string,
  private: boolean,
  createdAt: Date,
  deletedAt: Date | null,
  OwnerId: number,
  url: string,
};

export type TSubscribedspaces = {
  Sharedspace: Pick<TSharedspace, 'name' | 'url' | 'private'> & { Owner: Pick<TUser, 'email'> },
} & TSharedspaceMembers;

export const SubscribedspacesFilter = {
  ALL: 'all',
  OWNED: 'owned',
  UNOWNED: 'unowned',
} as const;

export type TSubscribedspacesFilter = typeof SubscribedspacesFilter[keyof typeof SubscribedspacesFilter];