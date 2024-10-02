import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from 'Containers/Header';
import SubscribedSpacesContainer from 'Containers/SubscribedSpacesContainer';
import { useNavigate } from 'react-router-dom';
import useUser from 'Hooks/useUser';

const SubscribedSpacesPage: FC = () => {
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
        <SubscribedSpacesContainer />
      </Main>
    </Block>
  );
};

export default SubscribedSpacesPage;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--black);
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;