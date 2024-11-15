import { useQuery } from '@tanstack/react-query';
import { getUser } from 'Api/usersApi';
import { GET_USER_KEY } from 'Lib/queryKeys';
import { useParams } from 'react-router-dom';
import { SharedspaceMembersRoles, TSharedspace, TSharedspaceMembers, TUser } from 'Typings/types';

type UseUserReturnType = {
  userData: TUser,
  refetch: () => void,
  isLoading: boolean,
  isLogin: boolean,
  isNotLogin: boolean,
  isOwner: boolean,
  hasPermission: boolean,
  userRoleName: string,
};

const useUser = (): UseUserReturnType => {
  const { url = '' } = useParams();
  const {
    data: userData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  });

  const isOwner = (): boolean => {
    if (userData) {
      const roleName = userData
        .Sharedspacemembers
        .filter((it: { Sharedspace: Pick<TSharedspace, 'url'> }) => it.Sharedspace.url === url)[0]
        ?.Role.name;

      return roleName === SharedspaceMembersRoles.OWNER;
    }

    return false;
  };

  const hasPermission = (): boolean => {
    if (userData) {
      const roleName = userData
        .Sharedspacemembers
        .filter((it: { Sharedspace: Pick<TSharedspace, 'url'> }) => it.Sharedspace.url === url)[0]
        ?.Role.name;
      
      return roleName === SharedspaceMembersRoles.MEMBER || roleName === SharedspaceMembersRoles.OWNER;
    }

    return false;
  };

  const getRoleName = (): string => {
    if (userData) {
      return userData
        .Sharedspacemembers
        .filter((it: { Sharedspace: Pick<TSharedspace, 'url'> }) => it.Sharedspace.url === url)[0]
        ?.Role.name;
    }

    return '';
  };

  return {
    userData,
    refetch,
    isLoading,
    isLogin: Boolean(!isLoading && userData),
    isNotLogin: Boolean(!isLoading && !userData),
    isOwner: isOwner(),
    hasPermission: hasPermission(),
    userRoleName: getRoleName(),
  };
};

export default useUser;