import React, { FC } from 'react';
import styled from '@emotion/styled';
import InputField from 'Components/common/InputField';
import SubmitButton from 'Components/common/SubmitButton';
import LongSubmitButton, { ButtonIconName } from 'Components/common/LongSubmitButton';

type ErrorType = {
  email: string,
  password: string,
  passwordChk: string, 
};

interface JoinFormProps {
  email: string;
  password: string;
  passwordChk: string;
  errors: ErrorType;
  onSubmit: (e: any) => void;
  goBack: () => void;
  onChangeEmail: (e: any) => void;
  onChangePassword: (e: any) => void;
  onChangePasswordChk: (e: any) => void;
};

const JoinForm: FC<JoinFormProps> = ({
  email,
  password,
  passwordChk,
  errors,
  onSubmit,
  goBack,
  onChangeEmail,
  onChangePassword,
  onChangePasswordChk,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Title>회원가입</Title>
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
      <InputField
        id={'passwordChk'}
        value={passwordChk}
        onChangeValue={onChangePasswordChk}
        title={'비밀번호 확인'}
        type={'password'} />
      {errors.passwordChk ? <ErrorSpan>{errors.passwordChk}</ErrorSpan> : <ErrorSpan />}
      <ButtonBox>
        <LongSubmitButton
          type={'submit'}
          icon={ButtonIconName.JOIN}>
            회원가입
        </LongSubmitButton>
        <SubmitButton
          onClick={goBack}
          type={'button'}>
            뒤로
        </SubmitButton>
      </ButtonBox>
    </Form>
  );
};

export default JoinForm;

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

export const ErrorSpan = styled.span`
  color: #e66641;
  font-size: 14px;
`;