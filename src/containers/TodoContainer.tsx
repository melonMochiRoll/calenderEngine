import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import TodoApp from './todo/TodoApp';
import HideIcon from '@mui/icons-material/LastPage';
import ShowIcon from '@mui/icons-material/FirstPage';

interface TodoContainerProps {
  todoTime: string;
  todosListDataRefetch: Function;
};

const TodoContainer: FC<TodoContainerProps> = ({
  todoTime,
  todosListDataRefetch,
}) => {
  const [ isTodoShow, setIsTodoShow ] = useState(true);

  const toggleMenu = () => {
    setIsTodoShow(prev => !prev);
  };
  
  return (
    <Block isTodoShow={isTodoShow}>
      <TodoHeader>
        {isTodoShow ? 
          <HideIcon
            onClick={toggleMenu}
            sx={{ fontSize: '30px' }} /> :
          <ShowIcon
            onClick={toggleMenu}
            sx={{ fontSize: '30px' }} />}
      </TodoHeader>
      {isTodoShow ?
        <TodoApp
          todoTime={todoTime}
          todosListDataRefetch={todosListDataRefetch} /> : ''}
    </Block>
  );
};

export default TodoContainer;

const Block = styled.div<{ isTodoShow: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({isTodoShow}) => isTodoShow ? '550px' : '50px'};
  height: 100vh;
  padding: 10px;
  border: 1px solid #2f323b;
  background-color: var(--dark-gray);
`;

const TodoHeader = styled.div`
  svg {
    color: var(--white);
    border-radius: 8px;
    cursor: pointer;
  }

  svg:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;