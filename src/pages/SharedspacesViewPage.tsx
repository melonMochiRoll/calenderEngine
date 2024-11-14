import React, { FC } from 'react';
import styled from '@emotion/styled';
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import SharedspaceHeader from 'Containers/SharedspaceHeader';
import useSharedspace from 'Hooks/useSharedspace';
import SkeletonSharedspaceHeader from 'Components/skeleton/SkeletonSharedspaceHeader';

const SharedspacesViewPage: FC = () => {
  const {
    data: spaceData,
    isLoading,
  } = useSharedspace();
  
  return (
    <Block>
      {
        isLoading ?
          <SkeletonSharedspaceHeader /> :
          <SharedspaceHeader
            spaceData={spaceData}/>
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