import React, { FC } from 'react';
import styled from '@emotion/styled';

interface SubmitButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined,
  onClick?: () => void;
};

const SubmitButton: FC<SubmitButtonProps> = ({ 
  type,
  children,
  onClick,
  }) => {
  return (
    <Button
      onClick={onClick}
      type={type}>
      {children}
    </Button>
  )
};

export default SubmitButton;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 50px;
  color: #fff;
  background-color: #2ab2dd;
  border: solid 2px #2ab2dd;
  border-radius: 30px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 800;
  gap: 7px;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;