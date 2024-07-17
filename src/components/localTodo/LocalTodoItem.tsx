import React, { FC } from 'react';
import styled from '@emotion/styled';
import ChkIcon from '@mui/icons-material/CheckCircleRounded';
import ChkLineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BackIcon from '@mui/icons-material/BackspaceRounded';
import { TLocalTodo } from 'Typings/types';
import EditableText from 'Components/common/EditableText';

interface LocalTodoItemProps {
  todos: TLocalTodo;
  editTodo: (todosId: string, contents: string) => void;
  shiftTodo: (todosId: string, isComplete: boolean) => void;
  deleteTodo: (todosId: string) => void;
};

const LocalTodoItem: FC<LocalTodoItemProps> = ({
  todos,
  editTodo,
  shiftTodo,
  deleteTodo,
}) => {
  const { id: todosId, contents, isComplete } = todos;

  const onSubmit = (editedContents: string) => {
    if (editedContents === contents) {
      return;
    }

    editTodo(todosId, editedContents?.trim());
  };

  return (
    <Block isComplete={isComplete}>
      <Switch onClick={() => shiftTodo(todosId, isComplete)}>
        {isComplete ?
          <ChkIcon sx={{ color: 'var(--pink)' }} fontSize='large' /> :
          <ChkLineIcon sx={{ color: '#b6bac1' }} fontSize='large' />}
      </Switch>
      <Contents>
        <EditableText
          text={contents}
          submitEvent={onSubmit}/>
        <BackIcon onClick={() => deleteTodo(todosId)} sx={{ color: '#e66641' }}/>
      </Contents>
    </Block>
  );
};

export default LocalTodoItem;

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