import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useUser from 'Hooks/useUser';
import JoinContainer from 'Containers/JoinContainer';

const JoinPage: FC = () => {
  const navigate = useNavigate();
  const [ userData ] = useUser();

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  }, [userData]);
  
  return (
    <Block>
      <JoinContainer
        navigate={navigate} />
    </Block>
  );
};

export default JoinPage;

const Block = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #0f102b;
`;