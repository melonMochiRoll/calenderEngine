import { loginOAuth2Naver } from 'Api/authApi';
import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NaverLoginPage: FC = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const naver_state = sessionStorage.getItem('naver_state');
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  
  useEffect(() => {
    if (error) {
      console.error(error, error_description);
    }

    if (
      !code ||
      !state ||
      naver_state !== state ||
      error
    ) {
      navigate('/');
      return;
    }

    loginOAuth2Naver(code, state)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err); // TODO: 에러 객체 확인 409 에러 발생시 핸들링 할것
      });
    
    return () => {
      sessionStorage.removeItem('naver_state');
    };
  }, []);

  return (<></>);
};

export default NaverLoginPage;