import { useQuery } from "@tanstack/react-query";
import { getSharedspace } from "Api/sharedspacesApi";
import { AxiosError } from "axios";
import { GET_SHAREDSPACE_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { TErrorResponse, TSharedspaceMetaData } from "Typings/types";

type TUseSharedspaceReturnType = {
  data: TSharedspaceMetaData,
  errorResponse: TErrorResponse | null,
  isLoading: boolean,
};

const useSharedspace = (url: string): TUseSharedspaceReturnType => {
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [GET_SHAREDSPACE_KEY],
    queryFn: () => getSharedspace(url),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [url]);

  return {
    data,
    errorResponse: error instanceof AxiosError ? error.response?.data : null,
    isLoading,
  };
};

export default useSharedspace;