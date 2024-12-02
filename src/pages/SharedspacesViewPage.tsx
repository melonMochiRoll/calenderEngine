import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import SharedspaceHeader from 'Containers/SharedspaceHeader';
import useSharedspace from 'Hooks/useSharedspace';
import SkeletonSharedspaceHeader from 'Components/skeleton/SkeletonSharedspaceHeader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { defaultToastOption, privateTooltip, waitingMessage } from 'Lib/noticeConstants';

const SharedspacesViewPage: FC = () => {
  const navigate = useNavigate();
  const {
    data: spaceData,
    error,
    errorCode,
    isLoading,
  } = useSharedspace();

  useEffect(() => {
    if (!isLoading && error) {
      const delay = setTimeout(() => {
        if (!error) {
          clearTimeout(delay);
        } else {
          const errorMessage = errorCode === 403 ?
            privateTooltip :
            waitingMessage;

          toast.error(errorMessage, {
            ...defaultToastOption,
          });
          navigate('/login');
        }
      }, 500);

      return () => {
        clearTimeout(delay);
      };
    }
  }, [isLoading, error]);
  
  return (
    <Block>
      {
        !isLoading && spaceData ?
          <SharedspaceHeader
            spaceData={spaceData} /> :
          <SkeletonSharedspaceHeader />
      }
      <Main>
        <CalendarContainer />
        <TodoContainer />
      </Main>
    </Block>
  );
};

export default SharedspacesViewPage;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--black);
`;

const Main = styled.main`
  display: flex;
  height: 95%;
`;