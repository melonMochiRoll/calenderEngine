import { useQuery } from "@tanstack/react-query";
import { getSubscribedspaces } from "Api/sharedspacesApi";
import handleHooksError from "Lib/handleHooksError";
import { GET_SUBSCRIBED_SPACES_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TSubscribedspaces } from "Typings/types";

type TUseSubscribedspaceReturnType = {
  data: TSubscribedspaces[],
  isLoading: boolean,
  refetch: () => void,
};

const useSubscribedspace = (filter: string): TUseSubscribedspaceReturnType => {
  const navigate = useNavigate();
  const {
    error,
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [GET_SUBSCRIBED_SPACES_KEY],
    queryFn: () => getSubscribedspaces(filter),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [filter]);

  useEffect(() => {
    if (isError) {
      handleHooksError(error, navigate);
    }
  }, [isError]);

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useSubscribedspace;