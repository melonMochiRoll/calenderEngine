import { useEffect, useState } from "react";
import useInput from "./useInput";
import { useQuery } from "@tanstack/react-query";
import { SEARCH_LOCAL_TODOS_KEY } from "Lib/queryKeys";
import { searchLocalTodos } from "Lib/localTodos";
import { TLocalTodo, TQueryStatus } from "Typings/types";

type TUseLocalSearchReturnData = {
  query: string,
  onChangeQuery: (e: any) => void,
  status: TQueryStatus,
  todos: TLocalTodo[],
  refetch: () => void,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
};

const useLocalSearch = (): TUseLocalSearchReturnData => {
  const [ query, onChangeQuery ] = useInput('');
  const [ offset, setOffset ] = useState(1);
  const {
    status,
    data,
    refetch,
  } = useQuery({
    queryKey: [SEARCH_LOCAL_TODOS_KEY, query, offset],
    queryFn: () => searchLocalTodos(query, offset),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query) {
      const delay = setTimeout(() => {
        setOffset(1);
      }, 500);
  
      return () => {
        clearTimeout(delay);
      };
    }
  }, [query]);

  return {
    query,
    onChangeQuery,
    status,
    todos: data || [],
    refetch,
    setOffset,
  };
};

export default useLocalSearch;