import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  canLoadMore: boolean,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
};

const useSearch = (): TUseSearchReturnData => {
  const qc = useQueryClient();
  const [ query, onChangeQuery ] = useInput('');
  const [ offset, setOffset ] = useState(1);
  const [ canLoadMore, setCanLoadMore ] = useState(true);
  const {
    status,
    data,
    refetch,
  } = useQuery({
    queryKey: [SEARCH_TODOS_KEY],
    queryFn: () => searchTodos(query),
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
        setOffset(1);
        setCanLoadMore(true);
        refetch();
      }, 500);
  
      return () => {
        clearTimeout(delay);
      };
    }
  }, [query]);

  useEffect(() => {
    if (offset > 1) {
      searchTodos(query, offset)
        .then(res => {
          if (res?.length < 10) {
            setCanLoadMore(false);
          }
          qc.setQueryData([SEARCH_TODOS_KEY], [ ...data, ...res ]);
        })
        .catch(err => console.error(err));
    }
  }, [offset]);

  return {
    query,
    onChangeQuery,
    status,
    todos: data,
    setOffset,
    canLoadMore,
  };
};

export default useSearch;