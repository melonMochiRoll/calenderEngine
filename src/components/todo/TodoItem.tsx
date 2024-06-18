import React, { FC } from 'react';
import styled from '@emotion/styled';
import ChkIcon from '@mui/icons-material/CheckCircleRounded';
import ChkLineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BackIcon from '@mui/icons-material/BackspaceRounded';
import { todosType } from 'Hooks/useTodos';

interface TodoItemProps {
  todos: todosType;
  shiftTodo: (todosId: number, contents: string, isComplete: boolean) => void;
  deleteTodo: (todosId: number) => void;
};

const TodoItem: FC<TodoItemProps> = ({
  todos,
  shiftTodo,
  deleteTodo,
}) => {
  const { id: todosId, contents, isComplete } = todos;

  return (
    <Block isComplete={isComplete}>
      <Switch onClick={() => shiftTodo(todosId, contents, !isComplete)}>
        {isComplete ?
          <ChkIcon sx={{ color: 'var(--pink)' }} fontSize='large' /> :
          <ChkLineIcon sx={{ color: '#b6bac1' }} fontSize='large' />}
      </Switch>
      <Contents>
        <span>{contents}</span>
        <BackIcon onClick={() => deleteTodo(todosId)} sx={{ color: '#e66641' }}/>
      </Contents>
    </Block>
  );
};

export default TodoItem;

const Block = styled.div<{ isComplete: boolean }>`
  display: flex;
  align-items: center;
  width: 280px;
  font-size: 18px;
  padding: 13px 15px;
  border: ${({isComplete}) => isComplete ? `2px solid var(--pink)` : `2px solid var(--light-gray)`};
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
  color: var(--white);

  svg {
    opacity: 0;
    cursor: pointer;
    transition: all 0.1s;
  }
`;