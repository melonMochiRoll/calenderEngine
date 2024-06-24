import React, { FC } from 'react';
import styled from '@emotion/styled';

const TodoNull: FC = () => {
  return (
    <Text>리스트가 비어있습니다.</Text>
  );
};

export default TodoNull;

const Text = styled.span`
  margin-top: 150px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #9298a1;
`;