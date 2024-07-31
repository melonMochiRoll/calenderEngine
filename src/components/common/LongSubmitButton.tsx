import React, { FC } from 'react';
import styled from '@emotion/styled';
import LoginIcon from '@mui/icons-material/Login';
import SignUpIcon from '@mui/icons-material/PersonAddAlt1';

export enum EButtonIconName {
  LOGIN = 'login',
  JOIN = 'join',
  NAVER = 'naver',
};

interface LongSubmitButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined,
  children: React.ReactNode,
  onClick?: () => void,
  hexCode?: string,
  icon?: EButtonIconName,
};

const LongSubmitButton: FC<LongSubmitButtonProps> = ({
  type,
  hexCode,
  icon,
  onClick,
  children,
}) => {
  const renderIcon = () => {
    if (icon === EButtonIconName.LOGIN) {
      return <LoginIcon />
    }

    if (icon === EButtonIconName.JOIN) {
      return <SignUpIcon />
    }

    if (icon === EButtonIconName.NAVER) {
      return <span>N</span>
    }

    return;
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      hexCode={hexCode}>
      <Side>{renderIcon()}</Side>
      {children}
      <Side/>
    </Button>
  );
};

export default LongSubmitButton;

const Button = styled.button<{ hexCode?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
  padding: 0 20px;
  color: #fff;
  background-color: ${({ hexCode }) => hexCode ? hexCode : 'var(--purple)'};
  border: solid 2px ${({ hexCode }) => hexCode ? hexCode : 'var(--purple)'};
  border-radius: 30px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 800;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const Side = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 24px;
`;