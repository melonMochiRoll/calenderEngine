import { useQuery } from '@tanstack/react-query';
import { getTodos } from 'Api/todosApi';
import { GET_TODOS_KEY } from 'Lib/queryKeys';
import { TTodo } from 'Typings/types';

export type statusType = 'loading' | 'error' | 'success';

type UseTodosReturnType = [
  statusType,
  TTodo[],
  Function,
];

const useTodos = (
  date: string,
  ): UseTodosReturnType => {
  const {
    status,
    data,
    refetch,
  } = useQuery({
    queryKey: [GET_TODOS_KEY, date],
    queryFn: () => getTodos(date),
    refetchOnWindowFocus: false,
  });

  return [
    status,
    data || null,
    refetch,
  ];
};

export default useTodos;