import React, { FC, useCallback } from 'react';
import styled from '@emotion/styled';
import MenuButton from 'Components/common/MenuButton';
import { useNavigate } from 'react-router-dom';
import useUser from 'Hooks/useUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from 'Api/usersApi';
import { useQueryClient } from '@tanstack/react-query';

interface HeaderProps {};

const Header: FC<HeaderProps> = () => {
  const navigator = useNavigate();
  const qc = useQueryClient();
  const [ userData, refetch ] = useUser();

  const onLogout = useCallback(() => {
    logout()
      .then(() => {
        refetch();
        qc.setQueryData(['getCurrentMonthTodos'], {});
        navigator('/');
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Block>
      {userData ?
        <>
          <AccountCircleIcon sx={{ color: '#efeff1' }} />
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
  color: #efeff1;
  font-size: 16px;
  font-weight: 500;
`;