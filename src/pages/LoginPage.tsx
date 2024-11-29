import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import useUser from 'Hooks/useUser';
import LoginContainer from 'Containers/LoginContainer';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { userData, isLogin } = useUser();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [userData]);

  return (
    <Block>
      <LoginContainer />
    </Block>
  )
};

export default LoginPage;

const Block = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #1f2128;
`;