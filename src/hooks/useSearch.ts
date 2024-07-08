import { useQuery } from "@tanstack/react-query";
import useInput from "./useInput";
import { SEARCH_TODOS_KEY } from "Lib/queryKeys";
import { searchTodos } from "Api/todosApi";
import { useEffect, useState } from "react";
import { TQueryStatus, TTodo } from "Typings/types";

type TUseSearchReturnData = {
  query: string,
  onChangeQuery: (e: any) => void,
  status: TQueryStatus,
  todos: TTodo[],
  refetch: () => void,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
};

const useSearch = (): TUseSearchReturnData => {
  const [ query, onChangeQuery ] = useInput('');
  const [ offset, setOffset ] = useState(1);
  const {
    status,
    data,
    refetch,
  } = useQuery({
    queryKey: [SEARCH_TODOS_KEY, query, offset],
    queryFn: () => searchTodos(query, offset),
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
    todos: data,
    refetch,
    setOffset,
  };
};

export default useSearch;