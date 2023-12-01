import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthTodos } from 'Api/todosApi';
import { useEffect, useState } from 'react';

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

const useTodos = (
  year: number,
  monthIndex: number,
  ): UseTodosReturnType => {
  const { data: currentMonthTodos, refetch } = useQuery<currentMonthTodosType>({
    queryKey: ['getCurrentMonthTodos'],
    queryFn: () => getCurrentMonthTodos(year, monthIndex),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [year, monthIndex]);

  if (!currentMonthTodos) {
    return [ {} ];
  }
  
  return [ currentMonthTodos ];
};

export default useTodos;