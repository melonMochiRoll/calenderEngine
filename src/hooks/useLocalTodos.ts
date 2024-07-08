import { useQuery } from '@tanstack/react-query';
import { getLocalTodos } from 'Lib/localTodos';
import { GET_LOCAL_TODOS_KEY } from 'Lib/queryKeys';
import { TLocalTodo } from 'Typings/types';

type UseLocalTodosReturnType = [
  TLocalTodo[],
  Function,
];

const useLocalTodos = (
  date: string,
  ): UseLocalTodosReturnType => {
  const {
    data,
    refetch,
  } = useQuery({
    queryKey: [GET_LOCAL_TODOS_KEY, date],
    queryFn: () => getLocalTodos(date),
    refetchOnWindowFocus: false,
  });

  return [
    data || [],
    refetch,
  ];
};

export default useLocalTodos;