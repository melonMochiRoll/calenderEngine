import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import { logout } from 'Api/authApi';
import { useNavigate } from 'react-router-dom';
import useUser from 'Hooks/useUser';
import gravatar from 'gravatar';
import TextButton from 'Components/common/TextButton';
import { useQueryClient } from '@tanstack/react-query';
import { GET_USER_KEY } from 'Lib/queryKeys';

const RenderUserProfile: FC = () => {
  const navigator = useNavigate();
  const qc = useQueryClient();
  const { userData } = useUser();

  const onLogout = useCallback(() => {
    logout()
      .catch((err) => {
        console.dir(err);
      })
      .finally(() => {
        qc.refetchQueries([GET_USER_KEY]);
      });
  }, []);
  
  return (
    <>
      {
        userData ?
          <>
            <ProfileImg
              alt='ProfileImg'
              src={userData.profileImage ? userData.profileImage : gravatar.url(userData?.email, { s: '25px', d: 'retro' })} />
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
  object-fit: cover;
`;