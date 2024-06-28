import { useQuery } from '@tanstack/react-query';
import { getLocalTodosList } from 'Lib/localTodos';
import { GET_LOCAL_TODOS_LIST_KEY } from 'Lib/queryKeys';
import { useEffect } from 'react';

export type todosListType = {
  [todoKey: string]: {
    partialContents: string[],
  };
};

type UseLocalTodosListReturnType = [
  todosListType,
  Function,
];

const useLocalTodosList = (
  date: string,
  ): UseLocalTodosListReturnType => {
  const {
    data,
    refetch,
  } = useQuery({
    queryKey: [GET_LOCAL_TODOS_LIST_KEY],
    queryFn: () => getLocalTodosList(date),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [date]);

  return [
    data || {},
    refetch,
  ];
};

export default useLocalTodosList;