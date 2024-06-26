import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthTodosList } from 'Api/todosApi';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
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

const useTodosList = (
  date: string,
  ): UseTodosListReturnType => {
  const {
    data: todosListData,
    refetch,
  } = useQuery({
    queryKey: [GET_TODOS_LIST_KEY],
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