import React, { FC } from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import useSharedspace from 'Hooks/useSharedspace';
import useSearchUsers from 'Hooks/useSearchUsers';
import SharedspaceManagerInitPage from './SharedspaceManagerInitPage';
import UserItem from './UserItem';

interface SharedspaceManagerMainProps {};

const SharedspaceManagerMain: FC<SharedspaceManagerMainProps> = ({}) => {
  const { data: spaceData, isLoading: isSharedspaceLoading } = useSharedspace();
  const { data: searchUsersData, isLoading: isSearchUsersLoading } = useSearchUsers();

  if (isSharedspaceLoading || isSearchUsersLoading) {
    return (
      <Main>
        <CircularProgress size={70} />
      </Main>
    );
  }

  if (spaceData && (!searchUsersData || !searchUsersData.length)) {
    return (
      <SharedspaceManagerInitPage
        spaceData={spaceData} />
    );
  }

  return (
    <Main>
      <List>
        {searchUsersData.map((data) => {
          return (
            <UserItem
              key={data.email}
              spaceData={spaceData}
              searchUserData={data} />
          );
        })}
      </List>
    </Main>
  );
};

export default SharedspaceManagerMain;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;