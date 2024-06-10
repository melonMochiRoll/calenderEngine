import { useQuery } from '@tanstack/react-query';
import { getUser } from 'Api/usersApi';
import { IUser } from 'src/typings/types';

type UseUserReturnType = [
  IUser,
  Function,
];

const useUser = (): UseUserReturnType => {
  const { data: userData, refetch } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  });

  return [ userData, refetch ];
};

export default useUser;