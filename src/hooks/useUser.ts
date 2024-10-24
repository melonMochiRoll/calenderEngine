import { useQuery } from '@tanstack/react-query';
import { getUser } from 'Api/usersApi';
import { GET_USER_KEY } from 'Lib/queryKeys';
import { TUser } from 'src/typings/types';

type UseUserReturnType = {
  userData: TUser,
  refetch: () => void,
  isLoading: boolean,
  isLogin: boolean,
  isNotLogin: boolean,
};

const useUser = (): UseUserReturnType => {
  const {
    data: userData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  });

  return {
    userData,
    refetch,
    isLoading,
    isLogin: Boolean(!isLoading && userData),
    isNotLogin: Boolean(!isLoading && !userData),
  };
};

export default useUser;