import { useQuery } from "@tanstack/react-query";
import { getSharedspaceChats } from "Api/sharedspacesApi";
import { GET_SHAREDSPACE_CHATS_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TChatList } from "Typings/types";

type TUseChatsReturnType = {
  data: {
    chats: TChatList[],
    hasMoreData: boolean
  },
  isLoading: boolean,
};

const useChats = (): TUseChatsReturnType => {
  const { url: _url } = useParams();
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [GET_SHAREDSPACE_CHATS_KEY],
    queryFn: () => getSharedspaceChats(_url, 1),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [_url]);

  return {
    data,
    isLoading,
  };
};

export default useChats;