import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type todoType = {
  title: string;
  isCompleted: boolean;
};

export type currentMonthTodosType = {
  [todoKey: string]: todoType[]
};

type UseTodosReturnType = [
  currentMonthTodosType,
];

const getCurrentMonthTodosFn = async (userId: number, monthIndex: number) => 
  await axios
    .get(`http://localhost:3000/api/todos?id=${userId}&mi=${monthIndex}`)
    .then(res => res.data);

const useTodos = (userId: number, monthIndex: number): UseTodosReturnType => {
  const { data: currentMonthTodos } = useQuery({
    queryKey: ['getCurrentMonthTodosKey'],
    queryFn: () => getCurrentMonthTodosFn(userId, monthIndex),
    refetchOnWindowFocus: false,
  });
  
  return [ currentMonthTodos ];
};

export default useTodos;