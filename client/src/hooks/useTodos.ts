import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthTodos } from 'Api/todosApi';
import { useEffect } from 'react';

export type todoType = {
  id?: number;
  contents: string;
  isComplete: boolean;
  deadline?: string;
};

export type currentMonthTodosType = {
  [todoKey: string]: todoType[];
};

type UseTodosReturnType = [
  currentMonthTodosType,
  Function,
];

const useTodos = (
  date: string,
  ): UseTodosReturnType => {
  const {
    data: currentMonthTodos,
    refetch,
  } = useQuery<currentMonthTodosType>({
    queryKey: ['getCurrentMonthTodos'],
    queryFn: () => getCurrentMonthTodos(date),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [date]);

  return [
    currentMonthTodos as currentMonthTodosType,
    refetch
  ];
};

export default useTodos;