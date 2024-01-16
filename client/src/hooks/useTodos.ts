import { useQuery } from '@tanstack/react-query';
import { getTodos } from 'Api/todosApi';
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
  todoType[],
  Function,
];

export const getTodosQueryKey = 'getTodos';

const useTodos = (
  date: string,
  isTodosExist: boolean,
  ): UseTodosReturnType => {
  const {
    data: todosData,
    refetch,
  } = useQuery({
    queryKey: [getTodosQueryKey],
    queryFn: () => getTodos(date, isTodosExist),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [date]);

  return [
    todosData || [],
    refetch,
  ];
};

export default useTodos;