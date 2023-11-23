import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import InputField from 'Components/common/InputField';
import SubmitButton from 'Components/common/SubmitButton';
import useInput from 'Hooks/useInput';
import { login } from 'Api/usersApi';
import useUser from 'Hooks/useUser';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [ email, onChangeEmail ] = useInput('');
  const [ password, onChangePassword ] = useInput('');
  const [ userData ] = useUser();

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
  
    login(email, password)
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error(`error : ${error}`));

  }, [email, password]);

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  }, [userData]);

  return (
    <Block>
      <Box onSubmit={onSubmit}>
        <Title>로그인</Title>
        <InputField
          value={email}
          onChangeValue={onChangeEmail}
          title={'이메일'}
          type={'text'} />
        <InputField
          value={password}
          onChangeValue={onChangePassword}
          title={'비밀번호'}
          type={'password'} />
        <ButtonBox>
          <SubmitButton type={'submit'}>로그인</SubmitButton>
        </ButtonBox>
      </Box>
    </Block>
  )
};

export default LoginPage;

const Block = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #0f102b;
`;

const Box = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 25px;
  margin-bottom: 300px;
  gap: 15px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 42px;
`;

const ButtonBox = styled.div`
  display: flex;
  padding: 15px;
`;