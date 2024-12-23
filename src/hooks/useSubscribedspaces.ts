import { useQuery } from "@tanstack/react-query";
import { getSubscribedspaces } from "Api/sharedspacesApi";
import { GET_SUBSCRIBED_SPACES_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TSubscribedspaces } from "Typings/types";
import { useAppSelector } from "./reduxHooks";

type TUseSubscribedspaceReturnType = {
  data: TSubscribedspaces[],
  isLoading: boolean,
  refetch: () => void,
};

const useSubscribedspace = (): TUseSubscribedspaceReturnType => {
  const navigate = useNavigate();
  const { filter } = useAppSelector(state => state.subscribedspaceFilter);
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

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useSubscribedspace;