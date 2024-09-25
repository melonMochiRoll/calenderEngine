import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import Header from 'Containers/Header';
import RenderModal from 'Components/common/RenderModal';
import useUser from 'Hooks/useUser';
import { useNavigate } from 'react-router-dom';

const MainPage: FC = () => {
  const navigate = useNavigate();
  const { userData, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !userData) {
      navigate('/login');
    }
  }, [userData]);

  return (
    <Block>
      <CalendarBlock>
        <Header />
        <CalendarContainer />
      </CalendarBlock>
      <TodoContainer />
      <RenderModal />
    </Block>
  );
};

export default MainPage;

const Block = styled.div`
  display: flex;
`;

const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px 100px;
  background-color: var(--black);
`;