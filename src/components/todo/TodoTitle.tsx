import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'Hooks/reduxHooks';

interface TodoTitleProps {};

const TodoTitle: FC<TodoTitleProps> = () => {
  const { todoTime } = useAppSelector(state => state.todoTime);
  const [ year, month, date ] = todoTime.split('-');
  
  return (
    <Title>{`${year}년 ${month}월 ${date}일`}</Title>
  );
};

export default TodoTitle;

export const Title = styled.h1`
  font-size: 46px;
  font-weigth: 800;
  color: var(--white);
  margin: 20px 0;
`;