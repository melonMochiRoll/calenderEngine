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

  const hasPermission = (): boolean => {
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

  const getRoleName = (): string => {
    if (userData) {
      return userData
        .Sharedspacemembers
        .filter((it: { Sharedspace: Pick<TSharedspace, 'url'> }) => it.Sharedspace.url === url)[0]
        ?.RoleName;
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