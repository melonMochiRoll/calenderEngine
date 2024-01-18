import { useQuery } from '@tanstack/react-query';
import { getTodos } from 'Api/todosApi';
import { useEffect } from 'react';

export type todosType = {
  id: number,
  contents: string,
  isComplete: boolean,
  date: Date,
  deadline: Date,
  UserId: number,
};

export type statusType = 'loading' | 'error' | 'success';

type UseTodosReturnType = [
  statusType,
  todosType[],
  Function,
];

export const getTodosQueryKey = 'getTodos';

const useTodos = (
  date: string,
  ): UseTodosReturnType => {
  const {
    status,
    data: todosData,
    refetch,
  } = useQuery({
    queryKey: [getTodosQueryKey],
    queryFn: () => getTodos(date),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [date]);

  return [
    status,
    todosData || null,
    refetch,
  ];
};

export default useTodos;