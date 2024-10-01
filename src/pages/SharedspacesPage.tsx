import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import Header from 'Containers/Header';
import RenderModal from 'Components/common/RenderModal';
import useUser from 'Hooks/useUser';
import { useNavigate } from 'react-router-dom';

const SharedspacesPage: FC = () => {
  const navigate = useNavigate();
  const { userData, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !userData) {
      navigate('/login');
    }
  }, [userData]);

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

export default SharedspacesPage;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  height: 100%;
`;