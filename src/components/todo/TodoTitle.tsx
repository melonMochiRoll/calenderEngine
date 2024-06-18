import React, { FC } from 'react';
import styled from '@emotion/styled';

interface TodoTitleProps {
  todoTime: string;
};

const TodoTitle: FC<TodoTitleProps> = ({
  todoTime,
}) => {
  const [ year, month, date ] = todoTime.split('-').map(Number);
  
  return (
    <Title>{`${year}년 ${month}월 ${date}일`}</Title>
  );
};

export default TodoTitle;

export const Title = styled.h1`
  font-size: 28px;
  font-weigth: 800;
  color: var(--white);
`;