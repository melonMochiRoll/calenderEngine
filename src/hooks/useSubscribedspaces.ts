import { useQuery } from "@tanstack/react-query";
import { getSubscribedspaces } from "Api/sharedspacesApi";
import { GET_SUBSCRIBED_SPACES_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { TSubscribedspaces } from "Typings/types";

type TUseSubscribedspaceReturnType = {
  data: TSubscribedspaces[],
  isLoading: boolean,
  refetch: () => void,
};

const useSubscribedspace = (filter: string): TUseSubscribedspaceReturnType => {
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [GET_SUBSCRIBED_SPACES_KEY],
    queryFn: () => getSubscribedspaces(filter),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [filter]);

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useSubscribedspace;