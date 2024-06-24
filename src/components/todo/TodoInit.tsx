import React, { FC } from 'react';
import styled from '@emotion/styled';

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
  align-items: center;
  padding-top: 200px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weigth: 800;
  color: var(--white);
`;