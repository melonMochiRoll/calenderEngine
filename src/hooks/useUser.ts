import { useQuery } from '@tanstack/react-query';
import { getUser } from 'Api/usersApi';
import { IUser } from 'src/typings/types';

type UseUserReturnType = [
  IUser,
  Function,
];

export const GET_USER_KEY = 'getUser';

const useUser = (): UseUserReturnType => {
  const { data: userData, refetch } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  });

  return [ userData, refetch ];
};

export default useUser;