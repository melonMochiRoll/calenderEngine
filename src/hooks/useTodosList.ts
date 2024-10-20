import { useQuery } from '@tanstack/react-query';
import { getTodosBySpace } from 'Api/todosApi';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
import { useEffect } from 'react';
import { TTodo } from 'Typings/types';

export type TTodosList = {
  [key: string]: TTodo[]
};

type UseTodosListReturnType = {
  data: TTodosList,
  isLoading: boolean,
  error: unknown,
}

const useTodosList = (
  url: string,
  year: string,
  month: string,
  ): UseTodosListReturnType => {
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [GET_TODOS_LIST_KEY],
    queryFn: () => getTodosBySpace(url, year, month),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [url, year, month]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useTodosList;