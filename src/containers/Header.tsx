import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import MenuButton from 'Components/common/MenuButton';
import { useNavigate } from 'react-router-dom';
import useUser from 'Hooks/useUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from 'Api/usersApi';
import { useQueryClient } from '@tanstack/react-query';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';

interface HeaderProps {};

const Header: FC<HeaderProps> = () => {
  const navigator = useNavigate();
  const qc = useQueryClient();
  const [ userData, refetch ] = useUser();

  const onLogout = useCallback(() => {
    logout()
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        refetch();
        qc.setQueryData([GET_TODOS_LIST_KEY], {});
        navigator('/');
      });
  }, []);

  return (
    <Block>
      {userData ?
        <>
          <AccountCircleIcon sx={{ color: 'var(--white)' }} />
          <EmailSpan>{userData.email}</EmailSpan>
          <MenuButton
            onClick={() => onLogout()}
            type={'button'}>
              로그아웃
          </MenuButton>
        </>
        :
        <>
          <MenuButton
            onClick={() => navigator('/login')}
            type={'button'}
            filled>
              로그인
          </MenuButton>
          <MenuButton
            onClick={() => navigator('/join')}
            type={'button'}>
              회원가입
          </MenuButton>
        </>
      }
    </Block>
  );
};

export default Header;

const Block = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
`;

const EmailSpan = styled.span`
  color: var(--white);
  font-size: 16px;
  font-weight: 500;
`;