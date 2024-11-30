import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import useUser from 'Hooks/useUser';
import LoginContainer from 'Containers/LoginContainer';
import { toast } from 'react-toastify';
import { defaultToastOption } from 'Lib/noticeConstants';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { userData, isLogin } = useUser();
  const [ searchParams ] = useSearchParams();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [userData]);

  useEffect(() => {
    if (searchParams.get('error')) {
      toast.error(searchParams.get('error'), {
        ...defaultToastOption
      });
    }
  }, []);

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