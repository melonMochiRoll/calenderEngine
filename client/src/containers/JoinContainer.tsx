import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import InputField from 'Components/common/InputField';
import SubmitButton from 'Components/common/SubmitButton';
import useInput from 'Hooks/useInput';
import { createUser, getOneByEmail } from 'Api/usersApi';
import { NavigateFunction } from 'react-router-dom';
import JoinForm from 'Components/auth/JoinForm';

interface JoinContainerProps {
  navigate: NavigateFunction;
};

const JoinContainer: FC<JoinContainerProps> = ({
  navigate,
}) => {
  const [ email, onChangeEmail ] = useInput('');
  const [ password, onChangePassword ] = useInput('');
  const [ passwordChk, onChangePasswordChk ] = useInput('');
  const [ errors, setErrors ] = useState({
    email: '',
    password: '',
    passwordChk: '',
  });

  const confirmation = async (
    email: string,
    password: string,
    passwordChk: string,
  ) => {
    const isSubmit = {
      email: email ? '' : '이메일을 입력해주세요',
      password: password ? '' : '비밀번호를 입력해주세요',
      passwordChk: password === passwordChk ? '' : '비밀번호가 일치하지 않습니다.',
    };

    if (await getOneByEmail(email)) {
      isSubmit.email = '중복 된 이메일입니다.';
    }

    for (let value of Object.values(isSubmit)) {
      if (value) {
        setErrors(isSubmit);
        return false;
      }
    }

    return true;
  };

  const onSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    setErrors({
      email: '',
      password: '',
      passwordChk: '',
    });

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPasswordChk = passwordChk.trim();

    if (!await confirmation(
        trimmedEmail,
        trimmedPassword,
        trimmedPasswordChk
        )) return;

    createUser(trimmedEmail, trimmedPassword)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.error(err));
    
  }, [email, password, passwordChk]);

  const goBack = () => {
    navigate('/')
  };

  return (
    <JoinForm
      email={email}
      password={password}
      passwordChk={passwordChk}
      errors={errors}
      onSubmit={onSubmit}
      goBack={goBack}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangePasswordChk={onChangePasswordChk} />
  );
};

export default JoinContainer;