import { useQuery } from "@tanstack/react-query";
import useInput from "./useInput";
import { SEARCH_TODOS_KEY } from "Lib/queryKeys";
import { searchTodos } from "Api/todosApi";
import { useEffect, useState } from "react";
import { TTodo } from "Typings/types";

type TUseSearchReturnData = {
  query: string,
  onChangeQuery: (e: any) => void,
  isLoading: boolean,
  todos: TTodo[],
  refetch: () => void,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
};

const useSearch = (): TUseSearchReturnData => {
  const [ query, onChangeQuery ] = useInput('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ offset, setOffset ] = useState(1);
  const {
    data,
    refetch,
  } = useQuery({
    queryKey: [SEARCH_TODOS_KEY, offset],
    queryFn: () => searchTodos(query, offset),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query) {
      const delay = setTimeout(() => {
        setIsLoading(true);
        setOffset(1);
        refetch()
          .finally(() => setIsLoading(false));
      }, 500);
  
      return () => {
        clearTimeout(delay);
      };
    }
  }, [query]);

  return {
    query,
    onChangeQuery,
    isLoading,
    todos: data,
    refetch,
    setOffset,
  };
};

export default useSearch;