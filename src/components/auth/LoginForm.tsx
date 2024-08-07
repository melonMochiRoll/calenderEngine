import React, { FC } from 'react';
import styled from '@emotion/styled';
import InputField from 'Components/common/InputField';
import SubmitButton from 'Components/common/SubmitButton';
import { ErrorSpan } from './JoinForm';
import LongSubmitButton, { EButtonIconName } from 'Components/common/LongSubmitButton';

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
          icon={EButtonIconName.LOGIN}>
            로그인
        </LongSubmitButton>
        <LongSubmitButton
          type='button'
          hexCode='var(--naver-green)'
          icon={EButtonIconName.NAVER}>
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