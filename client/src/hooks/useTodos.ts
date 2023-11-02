import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthTodos } from 'Api/todosApi';

export type todoType = {
  id: number;
  contents: string[];
};

export type currentMonthTodosType = {
  [todoKey: string]: todoType;
};

type UseTodosReturnType = [
  currentMonthTodosType,
];

type UseTodosQueryKey = [
  string, number, number
];

const useTodos = (
  year: number,
  monthIndex: number,
  ): UseTodosReturnType => {
  const { data: currentMonthTodos } = useQuery<currentMonthTodosType, Error, currentMonthTodosType, UseTodosQueryKey>({
    queryKey: ['getCurrentMonthTodos', year, monthIndex],
    queryFn: ({ queryKey }) => getCurrentMonthTodos(queryKey[1], queryKey[2]),
    refetchOnWindowFocus: false,
  });

  if (!currentMonthTodos) {
    return [ {} ];
  }
  
  return [ currentMonthTodos ];
};

export default useTodos;