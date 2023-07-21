import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import ChkIcon from '@mui/icons-material/CheckCircleRounded';
import ChkLineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ClearIcon from '@mui/icons-material/ClearRounded';
import { todoType } from 'Containers/TodoContainer';

interface TodoItemProps {
  item: todoType;
};

const TodoItem: FC<TodoItemProps> = ({ item }) => {
  const [ completed, setCompleted ] = useState(item.isCompleted);

  return (
    <Block completed={completed}>
      <Switch onClick={() => setCompleted((prev) => !prev)}>
        {completed ?
          <ChkIcon sx={{ color: '#2fb765' }} fontSize='large' /> :
          <ChkLineIcon sx={{ color: 'rgba(0, 0, 0, 0.2)' }} fontSize='large' />}
      </Switch>
      <span>{item.title}</span>
    </Block>
  );
};

export default TodoItem;

const Block = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  padding: 15px 15px;
  box-shadow: ${({completed}) => completed ?
    `0 0 6px #2fb765` :
    `0 0 3px rgba(0, 0, 0, 0.4)`};
  border-radius: 6px;

  span {
    font-size: 18px;
    font-weight: 500;
  }
`;

const Switch = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;