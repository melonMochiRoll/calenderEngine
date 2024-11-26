import { loginOAuth2Naver } from 'Api/authApi';
import { conflictAccountMessage, defaultToastOption, waitingMessage } from 'Lib/noticeConstants';
import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        navigate('/login');
        if (err?.response?.status === 409) {
          toast.error(conflictAccountMessage, {
            ...defaultToastOption,
          });
          return;
        }
        
        toast.error(waitingMessage, {
          ...defaultToastOption
        });
      });
    
    return () => {
      sessionStorage.removeItem('naver_state');
    };
  }, []);

  return (<></>);
};

export default NaverLoginPage;