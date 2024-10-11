import { useQuery } from '@tanstack/react-query';
import { getTodosForSpace } from 'Api/sharedspacesApi';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
import { useEffect } from 'react';
import { TTodo } from 'Typings/types';

export type TTodosList = {
  [key: string]: TTodo[]
};

type UseTodosListReturnType = {
  data: TTodosList,
  isLoading: boolean,
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
  } = useQuery({
    queryKey: [GET_TODOS_LIST_KEY],
    queryFn: () => getTodosForSpace(url, year, month),
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });

  useEffect(() => {
    refetch();
  }, [url, year, month]);

  return {
    data,
    isLoading,
  };
};

export default useTodosList;