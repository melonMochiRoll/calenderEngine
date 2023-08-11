import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ToDoTitle } from 'Containers/TodoApp';

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
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
`;