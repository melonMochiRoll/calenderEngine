import React, { FC } from 'react';
import styled from '@emotion/styled';

interface TextButtonProps {
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
}

const TextButton: FC<TextButtonProps> = ({
  onClick,
  type,
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}>
      {children}
    </Button>
  );
};

export default TextButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  width: 100px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
  border: none;

  &:hover {
    color: var(--blue);
  }
`;