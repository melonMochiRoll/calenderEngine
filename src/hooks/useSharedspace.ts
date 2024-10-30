import { useQuery } from "@tanstack/react-query";
import { getSharedspace } from "Api/sharedspacesApi";
import { AxiosError } from "axios";
import { GET_SHAREDSPACE_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TErrorResponse, TSharedspaceMetaData } from "Typings/types";
import handleHooksError from "Lib/handleHooksError";

type TUseSharedspaceReturnType = {
  data: TSharedspaceMetaData,
  errorResponse: TErrorResponse | null,
  isLoading: boolean,
};

const useSharedspace = (): TUseSharedspaceReturnType => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (isError) {
      handleHooksError(error, navigate);
    }
  }, [isError]);

  return {
    data,
    errorResponse: error instanceof AxiosError ? error.response?.data : null,
    isLoading,
  };
};

export default useSharedspace;