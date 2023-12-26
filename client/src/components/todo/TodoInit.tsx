import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Title } from 'Components/todo/TodoTitle';

const TodoInit: FC = () => {
  return (
    <Container>
      <Title>날짜를 선택해주세요</Title>
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