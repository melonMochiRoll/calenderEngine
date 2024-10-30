import { useQuery } from '@tanstack/react-query';
import { getTodosBySpace } from 'Api/todosApi';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TTodo } from 'Typings/types';
import { useAppSelector } from './reduxHooks';

export type TTodosList = {
  [key: string]: TTodo[]
};

type UseTodosListReturnType = {
  data: TTodosList,
  isLoading: boolean,
  error: unknown,
}

const useTodosList = (): UseTodosListReturnType => {
  const { url = '' } = useParams();
  const {
    calendarYear,
    calendarMonth,
  } = useAppSelector(state => state.calendarTime);
  
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [GET_TODOS_LIST_KEY],
    queryFn: () => getTodosBySpace(url, calendarYear, calendarMonth),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [url, calendarYear, calendarMonth]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useTodosList;