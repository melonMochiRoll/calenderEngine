import { useQuery } from "@tanstack/react-query";
import { getJoinRequest } from "Api/joinrequestApi";
import { GET_JOINREQUEST_KEY } from "Lib/queryKeys";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TJoinRequest } from "Typings/types";

type TUseMyJoinRequestReturntype = {
  data: TJoinRequest[],
  isLoading: boolean,
}

const useJoinRequest = (): TUseMyJoinRequestReturntype => {
  const { url = '' } = useParams();
  const {
    data,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [GET_JOINREQUEST_KEY],
    queryFn: () => getJoinRequest(url),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [url]);

  return {
    data,
    isLoading,
  }
};

export default useJoinRequest;