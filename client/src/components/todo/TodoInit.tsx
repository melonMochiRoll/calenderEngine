import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TodoTitle } from 'Containers/todo/TodoApp';

const TodoInit: FC = () => {
  return (
    <Container>
      <TodoTitle>날짜를 선택해주세요</TodoTitle>
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