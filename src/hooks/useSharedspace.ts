import { useQuery } from "@tanstack/react-query";
import { getSharedspace } from "Api/sharedspacesApi";
import { AxiosError } from "axios";
import { GET_SHAREDSPACE_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TErrorResponse, TSharedspaceMetaData } from "Typings/types";

type TUseSharedspaceReturnType = {
  data: TSharedspaceMetaData,
  error: unknown,
  errorCode: number | undefined,
  errorResponse: TErrorResponse | null,
  isLoading: boolean,
};

const useSharedspace = (): TUseSharedspaceReturnType => {
  const { url = '' } = useParams();
  const {
    data,
    isLoading,
    isError,
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
    error,
    errorCode: error && error instanceof AxiosError ? error.response?.status : 500,
    errorResponse: error instanceof AxiosError ? error.response?.data : null,
    isLoading,
  };
};

export default useSharedspace;