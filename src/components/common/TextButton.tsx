import React, { FC } from 'react';
import styled from '@emotion/styled';

interface TextButtonProps {
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
  disabled?: boolean;
}

const TextButton: FC<TextButtonProps> = ({
  onClick,
  type,
  children,
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {children}
    </Button>
  );
};

export default TextButton;

const Button = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  width: 100px;
  color: ${({disabled}) => disabled ? 'var(--gray-6)' : 'var(--white)'};
  cursor: ${({disabled}) => disabled ? 'auto' : 'pointer'};
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0);
  border: none;

  &:hover {
    color: ${({disabled}) => disabled ? 'var(--gray-6)' : 'var(--blue)'};
  }
`;