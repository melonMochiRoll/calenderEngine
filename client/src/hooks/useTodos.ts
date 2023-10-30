import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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

const getCurrentMonthTodosFn = async (
  year: number,
  monthIndex: number,
  ) => 
  await axios
    .get(`http://localhost:3000/api/todos?y=${year}&mi=${monthIndex}`)
    .then(res => res.data);

const useTodos = (
  year: number,
  monthIndex: number,
  ): UseTodosReturnType => {
  const { data: currentMonthTodos } = useQuery({
    queryKey: ['getCurrentMonthTodos'],
    queryFn: () => getCurrentMonthTodosFn(year, monthIndex),
    refetchOnWindowFocus: false,
  });
  
  return [ currentMonthTodos ];
};

export default useTodos;