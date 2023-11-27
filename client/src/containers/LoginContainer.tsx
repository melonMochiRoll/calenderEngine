import React, { FC, useCallback, useState } from 'react';
import useInput from 'Hooks/useInput';
import { login } from 'Api/usersApi';
import { NavigateFunction } from 'react-router-dom';
import LoginForm from 'Components/auth/LoginForm';

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
      email: email ? '' : '이메일을 입력해주세요',
      password: password ? '' : '비밀번호를 입력해주세요',
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

    if (!confirmation(email, password)) return;
  
    login(email, password)
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