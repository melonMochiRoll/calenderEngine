import { useQuery } from "@tanstack/react-query";
import { getSharedspaceChats } from "Api/sharedspacesApi";
import { GET_SHAREDSPACE_CHATS_KEY } from "Lib/queryKeys";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TChats } from "Typings/types";

type TUseChatsReturnType = {
  data: TChats,
  isLoading: boolean,
  offset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
};

const useChats = (): TUseChatsReturnType => {
  const { url: _url } = useParams();
  const [ offset, setOffset ] = useState(1);
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [GET_SHAREDSPACE_CHATS_KEY],
    queryFn: () => getSharedspaceChats(_url, offset),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [_url]);

  return {
    data,
    isLoading,
    offset,
    setOffset,
  };
};

export default useChats;