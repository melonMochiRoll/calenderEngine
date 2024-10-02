import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import { logout } from 'Api/usersApi';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useUser from 'Hooks/useUser';
import gravatar from 'gravatar';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
import TextButton from 'Components/common/TextButton';

const RenderUserProfile: FC = () => {
  const navigator = useNavigate();
  const qc = useQueryClient();
  const { userData, refetch } = useUser();

  const onLogout = useCallback(() => {
    logout()
      .catch((err) => {
        console.dir(err);
      })
      .finally(() => {
        refetch();
        qc.setQueryData([GET_TODOS_LIST_KEY], {});
        navigator('/');
      });
  }, []);
  
  return (
    <>
      {
        userData ?
          <>
            <ProfileImg src={gravatar.url(userData?.email, { s: '25px', d: 'retro' })} />
            <EmailSpan>{userData.email}</EmailSpan>
            <TextButton
              onClick={() => onLogout()}
              type={'button'}>
                로그아웃
            </TextButton>
          </>
          :
          <>
            <TextButton
              onClick={() => navigator('/login')}
              type={'button'}>
                로그인
            </TextButton>
            <TextButton
              onClick={() => navigator('/join')}
              type={'button'}>
                회원가입
            </TextButton>
          </>
      }
    </>
  );
};

export default RenderUserProfile;

const EmailSpan = styled.span`
  color: var(--white);
  font-size: 16px;
  font-weight: 500;
`;

const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
`;