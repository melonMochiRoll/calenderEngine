import React, { FC } from 'react';
import styled from '@emotion/styled';
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import RenderModal from 'Components/common/RenderModal';
import Header from 'Containers/Header';

const SharedspacesViewPage: FC = () => {
  return (
    <Block>
      <Header />
      <Main>
        <CalendarContainer />
        <TodoContainer />
        <RenderModal />
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
  height: 100%;
`;