import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ChkIcon from '@mui/icons-material/CheckCircleRounded';
import ChkLineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BackIcon from '@mui/icons-material/BackspaceRounded';
import { todoType } from 'Pages/MainPage';

interface TodoItemProps {
  index: number;
  item: todoType;
  updateTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
};

const TodoItem: FC<TodoItemProps> = ({
  index,
  item,
  updateTodo,
  deleteTodo,
}) => {
  const [ completed, setCompleted ] = useState(item.isCompleted);

  useEffect(() => {
    setCompleted(item.isCompleted);
  }, [item]);

  const onChangeCompleted = (index: number) => {
    updateTodo(index);
    setCompleted((prev) => !prev);
  };

  return (
    <Block completed={completed}>
      <Switch onClick={() => onChangeCompleted(index)}>
        {completed ?
          <ChkIcon sx={{ color: '#2fb765' }} fontSize='large' /> :
          <ChkLineIcon sx={{ color: 'rgba(0, 0, 0, 0.2)' }} fontSize='large' />}
      </Switch>
      <Contents>
        <span>{item.title}</span>
        <BackIcon onClick={() => deleteTodo(index)} sx={{ color: '#ad0000' }}/>
      </Contents>
    </Block>
  );
};

export default TodoItem;

const Block = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  padding: 13px 15px;
  box-shadow: ${({completed}) => completed ?
    `0 0 6px #2fb765` :
    `0 0 3px rgba(0, 0, 0, 0.4)`};
  border-radius: 6px;

  span {
    font-size: 17px;
    font-weight: 500;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const Switch = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  svg {
    opacity: 0;
    cursor: pointer;
    transition: all 0.1s;
  }
`;