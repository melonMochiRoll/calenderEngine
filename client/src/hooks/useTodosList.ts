import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthTodosList } from 'Api/todosApi';
import { useEffect } from 'react';

export type todosListType = {
  [todoKey: string]: {
    partialContents: string[],
  };
};

type UseTodosListReturnType = [
  todosListType,
  Function,
];

export const useTodosListQueryKey = 'getCurrentMonthTodosList';

const useTodosList = (
  date: string,
  ): UseTodosListReturnType => {
  const {
    data: todosListData,
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
    todosListData || {},
    refetch,
  ];
};

export default useTodosList;