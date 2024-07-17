import React, { FC } from 'react';
import styled from '@emotion/styled';
import ChkIcon from '@mui/icons-material/CheckCircleRounded';
import ChkLineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BackIcon from '@mui/icons-material/BackspaceRounded';
import { TTodo } from 'Typings/types';
import EditableText from 'Components/common/EditableText';

interface TodoItemProps {
  todos: TTodo;
  updateTodo: (todosId: number, contents: string, isComplete: boolean) => void;
  deleteTodo: (todosId: number) => void;
};

const TodoItem: FC<TodoItemProps> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => {
  const { id: todosId, contents, isComplete } = todos;

  const onSubmit = (editedContents: string) => {
    if (editedContents === contents) {
      return;
    }

    updateTodo(todosId, editedContents?.trim(), isComplete);
  };

  return (
    <Block isComplete={isComplete}>
      <Switch onClick={() => updateTodo(todosId, contents, !isComplete)}>
        {isComplete ?
          <ChkIcon sx={{ color: 'var(--pink)' }} fontSize='large' /> :
          <ChkLineIcon sx={{ color: '#b6bac1' }} fontSize='large' />}
      </Switch>
      <Contents>
        <EditableText
          text={contents}
          submitEvent={onSubmit} />
        <BackIcon onClick={() => deleteTodo(todosId)} sx={{ color: '#e66641' }}/>
      </Contents>
    </Block>
  );
};

export default TodoItem;

const Block = styled.div<{ isComplete: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 13px 15px;
  border: ${({isComplete}) => isComplete ? `2px solid var(--pink)` : `2px solid var(--light-gray)`};
  border-radius: 6px;
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

  span {
    font-size: 20px;
    font-weight: 500;
  }

  svg {
    opacity: 0;
    cursor: pointer;
    transition: all 0.1s;
  }
  
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;