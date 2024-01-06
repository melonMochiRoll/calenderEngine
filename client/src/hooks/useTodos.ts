import { useQuery } from '@tanstack/react-query';
import { getTodos } from 'Api/todosApi';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export type todoType = {
  id: number,
  contents: string,
  isComplete: boolean,
  date: Date,
  deadline: Date,
  UserId: number,
};

type UseTodosReturnType = [
  todoType,
  Function,
];

export const getTodosQueryKey = 'getTodos';

const useTodos = (
  date: string,
  ): UseTodosReturnType => {
  const {
    data: todos,
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
    todos,
    refetch,
  ];
};

export default useTodos;