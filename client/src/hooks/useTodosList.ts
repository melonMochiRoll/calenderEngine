import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthTodosList } from 'Api/todosApi';
import { useEffect } from 'react';

export type currentMonthTodosListType = {
  [todoKey: string]: number;
};

type UseTodosListReturnType = [
  currentMonthTodosListType,
  Function,
];

export const useTodosListQueryKey = 'getCurrentMonthTodosList';

const useTodosList = (
  date: string,
  ): UseTodosListReturnType => {
  const {
    data: currentMonthTodos,
    refetch,
  } = useQuery({
    queryKey: [useTodosListQueryKey],
    queryFn: () => getCurrentMonthTodosList(date),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [date]);

  return [
    currentMonthTodos,
    refetch,
  ];
};

export default useTodosList;