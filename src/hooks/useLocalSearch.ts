import { useEffect, useState } from "react";
import useInput from "./useInput";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SEARCH_LOCAL_TODOS_KEY } from "Lib/queryKeys";
import { searchLocalTodos } from "Lib/localTodos";
import { TLocalTodo, TQueryStatus } from "Typings/types";

type TUseLocalSearchReturnData = {
  query: string,
  onChangeQuery: (e: any) => void,
  status: TQueryStatus,
  todos: TLocalTodo[],
  canLoadMore: boolean,
  nextOffset: () => void,
};

const useLocalSearch = (): TUseLocalSearchReturnData => {
  const qc = useQueryClient();
  const [ query, onChangeQuery ] = useInput('');
  const [ offset, setOffset ] = useState(0);
  const [ canLoadMore, setCanLoadMore ] = useState(true);
  const {
    status,
    data,
    refetch,
  } = useQuery({
    queryKey: [SEARCH_LOCAL_TODOS_KEY],
    queryFn: () => searchLocalTodos(query),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === 'success' && data?.length < 10) {
      setCanLoadMore(false);
    }
  }, [data]);

  useEffect(() => {
    if (query) {
      const delay = setTimeout(() => {
        setOffset(0);
        setCanLoadMore(true);
        refetch();
      }, 500);
  
      return () => {
        clearTimeout(delay);
      };
    }
  }, [query]);

  useEffect(() => {
    if (offset > 0) {
      searchLocalTodos(query, offset)
        .then(res => {
          if (res?.length < 10) {
            setCanLoadMore(false);
          }
          qc.setQueryData([SEARCH_LOCAL_TODOS_KEY], [ ...data as TLocalTodo[], ...res ]);
        })
        .catch(err => console.error(err));
    }
  }, [offset]);

  return {
    query,
    onChangeQuery,
    status,
    todos: data as TLocalTodo[],
    canLoadMore,
    nextOffset: () => setOffset(prev => prev + 1),
  };
};

export default useLocalSearch;