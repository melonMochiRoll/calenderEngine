import { useQuery } from '@tanstack/react-query';
import { getLocalTodos } from 'Lib/localTodos';
import { GET_LOCAL_TODOS_KEY } from 'Lib/queryKeys';
import { ILocalTodo } from 'Typings/types';
import { useEffect } from 'react';

type UseLocalTodosReturnType = [
  ILocalTodo[],
  Function,
];

const useLocalTodos = (
  date: string,
  ): UseLocalTodosReturnType => {
  const {
    data,
    refetch,
  } = useQuery({
    queryKey: [GET_LOCAL_TODOS_KEY],
    queryFn: () => getLocalTodos(date),
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

export default useLocalTodos;