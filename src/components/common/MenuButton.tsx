import React, { FC } from 'react';
import styled from '@emotion/styled';

interface MenuButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  filled?: boolean;
};

const MenuButton: FC<MenuButtonProps> = ({
  type,
  onClick,
  children,
  filled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      filled={filled}>
      {children}
    </Button>
  );
};

export default MenuButton;

const Button = styled.button<{ filled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: ${({filled}) => filled ? `rgba(0, 0, 0, 0)` : `var(--purple)`};
  border: ${({filled}) => filled ? `none` : `2px solid var(--purple)`} ;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({filled}) => filled ? `var(--purple)` : `rgba(0, 0, 0, 0)`};
  }
`;