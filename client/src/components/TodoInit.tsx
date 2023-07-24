import React, { FC } from 'react';
import styled from '@emotion/styled';

const TodoInit: FC = () => {
  return (
    <Container>
      <ToDoTitle>날짜를 선택해주세요</ToDoTitle>
    </Container>
  );
};

export default TodoInit;

const Container = styled.div`
  display: flex;
  width: 85%;
  padding: 50px 0 0 50px;
  flex-direction: column;
`;

const ToDoTitle = styled.h1``;