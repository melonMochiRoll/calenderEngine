import { useQuery } from '@tanstack/react-query';
import { getTodos } from 'Api/todosApi';
import { GET_TODOS_KEY } from 'Lib/queryKeys';
import { TQueryStatus, TTodo } from 'Typings/types';

type UseTodosReturnType = [
  TQueryStatus,
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