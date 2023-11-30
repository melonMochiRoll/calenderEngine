import React, { FC, useCallback, useState } from 'react';
import useInput from 'Hooks/useInput';
import { createUser, getOneByEmail } from 'Api/usersApi';
import { NavigateFunction } from 'react-router-dom';
import JoinForm from 'Components/auth/JoinForm';

const emailConfirmation = async (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    return '이메일을 입력해주세요';
  }

  if (!emailPattern.test(email)) {
    return '이메일 형식을 확인해주세요';
  }

  if (await getOneByEmail(email)) {
    return '중복 된 이메일입니다.';
  }

  return '';
};

const passwordConfirmation = (password: string) => {
  
  if (!password) {
    return '비밀번호를 입력해주세요';
  }

  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }

  return '';
};

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
      email: await emailConfirmation(email),
      password: passwordConfirmation(password),
      passwordChk: password !== passwordChk ? '비밀번호가 일치하지 않습니다.' : '',
    };

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

  const goBack = useCallback(() => {
    navigate('/');
  }, []);

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