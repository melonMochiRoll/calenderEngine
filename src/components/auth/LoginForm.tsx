import React, { FC } from 'react';
import styled from '@emotion/styled';
import InputField from 'Components/common/InputField';
import SubmitButton from 'Components/common/SubmitButton';
import { ErrorSpan } from './JoinForm';
import LongSubmitButton, { ButtonIconName } from 'Components/common/LongSubmitButton';
import { nanoid } from 'nanoid';

type ErrorType = {
  email: string,
  password: string,
};

interface LoginFormProps {
  email: string;
  password: string;
  errors: ErrorType;
  onSubmit: (e: any) => void;
  goBack: () => void;
  onChangeEmail: (e: any) => void;
  onChangePassword: (e: any) => void;
};

const LoginForm: FC<LoginFormProps> = ({
  email,
  password,
  errors,
  onSubmit,
  goBack,
  onChangeEmail,
  onChangePassword,
}) => {

  const onNaverLogin = () => {
    const request_url = 'https://nid.naver.com/oauth2.0/authorize';
    const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
    const state = nanoid(Number(process.env.REACT_APP_SALT_OR_ROUND));
    const redirect_uri = 'http://localhost:9000/login/oauth2/naver';

    sessionStorage.setItem('naver_state', state);
    window.open(`${request_url}?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`, '_self');
  };

  return (
    <Form onSubmit={onSubmit}>
      <Title>로그인</Title>
      <InputField
        id={'email'}
        value={email}
        onChangeValue={onChangeEmail}
        title={'이메일'}
        type={'text'} />
      {errors.email ? <ErrorSpan>{errors.email}</ErrorSpan> : <ErrorSpan />}
      <InputField
        id={'password'}
        value={password}
        onChangeValue={onChangePassword}
        title={'비밀번호'}
        type={'password'} />
      {errors.password ? <ErrorSpan>{errors.password}</ErrorSpan> : <ErrorSpan />}
      <ButtonBox>
        <LongSubmitButton
          type='submit'
          icon={ButtonIconName.LOGIN}>
            로그인
        </LongSubmitButton>
        <LongSubmitButton
          onClick={onNaverLogin}
          type='button'
          hexCode='var(--naver-green)'
          icon={ButtonIconName.NAVER}>
          네이버 로그인
        </LongSubmitButton>
        <SubmitButton
          onClick={goBack}
          type='button'>
            뒤로
        </SubmitButton>
      </ButtonBox>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 25px;
  margin-bottom: 300px;
  gap: 7px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 42px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 15px;
`;