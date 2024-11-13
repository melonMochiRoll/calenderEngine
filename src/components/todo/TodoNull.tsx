import React, { FC } from 'react';
import styled from '@emotion/styled';

const TodoNull: FC = () => {
  return (
    <Span>새 Todo를 작성해보세요!</Span>
  );
};

export default TodoNull;

const Span = styled.span`
  margin-top: 150px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #9298a1;
`;