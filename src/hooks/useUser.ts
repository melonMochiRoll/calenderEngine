import { useQuery } from '@tanstack/react-query';
import { getUser } from 'Api/usersApi';
import { GET_USER_KEY } from 'Lib/queryKeys';
import { SharedspaceMembersRoles, TSharedspace, TSharedspaceMembers, TUser } from 'Typings/types';

type UseUserReturnType = {
  userData: TUser,
  refetch: () => void,
  isLoading: boolean,
  isLogin: boolean,
  isNotLogin: boolean,
  isOwner: (url: string) => boolean,
  hasPermission: (url: string) => boolean,
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

  const isOwner = (url: string): boolean => {
    if (userData) {
      return userData
        .Sharedspacemembers
        .filter((it: { Sharedspace: Pick<TSharedspace, 'url'> }) => it.Sharedspace.url === url)
        .reduce((acc: boolean, it: TSharedspaceMembers) => {
          const isOwner = it.RoleName === SharedspaceMembersRoles.OWNER;
    
          return isOwner;
        }, false);
    }

    return false;
  };

  const hasPermission = (url: string): boolean => {
    if (userData) {
      return userData
        .Sharedspacemembers
        .filter((it: { Sharedspace: Pick<TSharedspace, 'url'> }) => it.Sharedspace.url === url)
        .reduce((acc: boolean, it: TSharedspaceMembers) => {
          const hasPermission = it.RoleName === SharedspaceMembersRoles.MEMBER || it.RoleName === SharedspaceMembersRoles.OWNER;
    
          return hasPermission;
        }, false);
    }

    return false;
  };

  return {
    userData,
    refetch,
    isLoading,
    isLogin: Boolean(!isLoading && userData),
    isNotLogin: Boolean(!isLoading && !userData),
    isOwner,
    hasPermission,
  };
};

export default useUser;