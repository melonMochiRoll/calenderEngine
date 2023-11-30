import React, { FC, useCallback, useState } from 'react';
import useInput from 'Hooks/useInput';
import { login } from 'Api/usersApi';
import { NavigateFunction } from 'react-router-dom';
import LoginForm from 'Components/auth/LoginForm';

const emailConfirmation = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    return '이메일을 입력해주세요';
  }

  if (!emailPattern.test(email)) {
    return '이메일 형식을 확인해주세요';
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

interface LoginContainerProps {
  navigate: NavigateFunction;
};

const LoginContainer: FC<LoginContainerProps> = ({
  navigate,
}) => {
  const [ email, onChangeEmail ] = useInput('');
  const [ password, onChangePassword ] = useInput('');
  const [ errors, setErrors ] = useState({
    email: '',
    password: '',
  });

  const confirmation = (email: string, password: string) => {
    const isSubmit = {
      email: emailConfirmation(email),
      password: passwordConfirmation(password),
    };

    for (let value of Object.values(isSubmit)) {
      if (value) {
        setErrors(isSubmit);
        return false;
      }
    }

    return true;
  };

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    setErrors({
      email: '',
      password: '',
    });

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!confirmation(trimmedEmail, trimmedPassword)) return;
  
    login(trimmedEmail, trimmedPassword)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setErrors({
          email: '이메일 혹은 비밀번호를 확인해주세요',
          password: '',
        });
        console.error(`error : ${error}`)
      });

  }, [email, password]);

  const goBack = useCallback(() => {
    navigate('/');
  }, []);
  
  return (
    <LoginForm
      email={email}
      password={password}
      errors={errors}
      onSubmit={onSubmit}
      goBack={goBack}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword} />
  );
};

export default LoginContainer;