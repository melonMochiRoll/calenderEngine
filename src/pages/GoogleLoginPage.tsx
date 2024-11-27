import { loginOAuth2Google } from 'Api/authApi';
import { conflictAccountMessage, defaultToastOption, waitingMessage } from 'Lib/noticeConstants';
import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleLoginPage: FC = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const google_state = sessionStorage.getItem('google_state');
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const scope = searchParams.get('scope');

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (
      !code ||
      !state ||
      !scope ||
      google_state !== state ||
      error
    ) {
      navigate('/');
      toast.error(waitingMessage, {
        ...defaultToastOption
      });
      return;
    }

    loginOAuth2Google(code, state, scope)
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
      })

    return () => {
      sessionStorage.removeItem('google_state');
    };
  }, []);

  return (<></>);
};

export default GoogleLoginPage;