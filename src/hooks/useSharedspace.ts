import { useQuery } from "@tanstack/react-query";
import { getSharedspace } from "Api/sharedspacesApi";
import { GET_SHAREDSPACE_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { TSharedspaceMetaData } from "Typings/types";

type TUseSharedspaceReturnType = {
  data: TSharedspaceMetaData,
  isLoading: boolean,
};

const useSharedspace = (url: string): TUseSharedspaceReturnType => {
  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [GET_SHAREDSPACE_KEY],
    queryFn: () => getSharedspace(url),
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });

  useEffect(() => {
    refetch();
  }, [url]);

  return {
    data,
    isLoading,
  };
};

export default useSharedspace;