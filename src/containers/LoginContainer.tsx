import React, { FC, useCallback, useState } from 'react';
import useInput from 'Hooks/useInput';
import { getUser, login } from 'Api/usersApi';
import { NavigateFunction } from 'react-router-dom';
import LoginForm from 'Components/auth/LoginForm';
import { useQueryClient } from '@tanstack/react-query';
import { getTodosForSpace } from 'Api/sharedspacesApi';
import dayjs from 'dayjs';
import { GET_TODOS_LIST_KEY, GET_USER_KEY } from 'Lib/queryKeys';

const emailConfirmation = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const result = {
    email: email.trim(),
    error: '',
  };

  if (!email) {
    result.error = '이메일을 입력해주세요';
    return result;
  }

  if (!emailPattern.test(email)) {
    result.error = '이메일 형식을 확인해주세요';
    return result;
  }

  return result;
};

const passwordConfirmation = (password: string) => {
  const result = {
    password: password.trim(),
    error: '',
  };

  if (!password) {
    result.error = '비밀번호를 입력해주세요';
    return result;
  }

  if (password.length < 8) {
    result.error = '비밀번호는 8자 이상이어야 합니다.';
    return result;
  }

  return result;
};

interface LoginContainerProps {
  navigate: NavigateFunction;
};

const LoginContainer: FC<LoginContainerProps> = ({
  navigate,
}) => {
  const qc = useQueryClient();
  const [ email, onChangeEmail ] = useInput('');
  const [ password, onChangePassword ] = useInput('');
  const [ errors, setErrors ] = useState({
    email: '',
    password: '',
  });

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    setErrors({
      email: '',
      password: '',
    });

    const emailConfirmResult = emailConfirmation(email);
    const passwordConfirmResult = passwordConfirmation(password);

    if (emailConfirmResult.error || passwordConfirmResult.error) {
      setErrors({
        email: emailConfirmResult.error,
        password: passwordConfirmResult.error,
      });
      return;
    }
  
    login(emailConfirmResult.email, passwordConfirmResult.password)
      .then(async () => { // prefetch 수정 필요
        const now = dayjs();
        await qc.prefetchQuery([GET_USER_KEY], () => getUser());
        await qc.prefetchQuery([GET_TODOS_LIST_KEY], () =>
          getTodosForSpace('D5d9a', String(now.year()), String(now.month() + 1).padStart(2, '0')));
        
        navigate('/');
      })
      .catch(() => {
        setErrors({
          email: '이메일 혹은 비밀번호를 확인해주세요',
          password: '',
        });
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