import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import Sidebar from 'Containers/Sidebar';
import SharedspaceHeader from 'Containers/SharedspaceHeader';
import SkeletonSharedspaceHeader from 'Components/skeleton/SkeletonSharedspaceHeader';
import TodoContainer from 'Containers/TodoContainer';
import { defaultToastOption, privateTooltip, waitingMessage } from 'Lib/noticeConstants';
import { toast } from 'react-toastify';
import useSharedspace from 'Hooks/useSharedspace';

const SharedspacesPage = () => {
  const navigate = useNavigate();
  const matches = useMatches();

  const {
    data: spaceData,
    error,
    errorCode,
    isLoading,
  } = useSharedspace();

  useEffect(() => {
    if (error) {
      const errorMessage = errorCode === 403 ?
        privateTooltip :
        waitingMessage;

      toast.error(errorMessage, {
        ...defaultToastOption,
      });
      navigate('/login');
    }
  }, [error]);
  
  useEffect(() => {
    if (matches.length < 2) {
      navigate('/sharedspaces/subscribed');
    }
  }, [matches]);
  
  return (
    <Block>
      <Sidebar />
      <Content>
        {
          !isLoading && spaceData ?
            <SharedspaceHeader
              spaceData={spaceData} /> :
            <SkeletonSharedspaceHeader />
        }
        <Main>
          <Outlet />
          <TodoContainer />
        </Main>
      </Content>
    </Block>
  );
};

export default SharedspacesPage;

const Block = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--black);
`;

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  height: 95%;
`;