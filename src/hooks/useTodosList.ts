import { useQuery } from '@tanstack/react-query';
import { getTodosForSpace } from 'Api/todosApi';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
import { useEffect } from 'react';
import { TTodo } from 'Typings/types';

export type TTodosList = {
  [key: string]: TTodo[]
};

type UseTodosListReturnType = {
  todosListData: TTodosList,
  refetch: Function,
}

const useTodosList = (
  year: string,
  month: string,
  ): UseTodosListReturnType => {
  const {
    data,
    refetch,
  } = useQuery({
    queryKey: [GET_TODOS_LIST_KEY],
    queryFn: () => getTodosForSpace('D5d9a', year, month),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [year, month]);

  return {
    todosListData: data || {},
    refetch,
  };
};

export default useTodosList;