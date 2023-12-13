import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoApp from './todo/TodoApp';
import TodoInit from 'Components/todo/TodoInit';
import { currentMonthTodosType } from 'Hooks/useTodos';

interface TodoContainerProps {
  todoTime: string;
  currentMonthTodos: currentMonthTodosType;
};

const TodoContainer: FC<TodoContainerProps> = ({
  todoTime,
  currentMonthTodos,
}) => {
  return (
    <Block>
      {todoTime ?
        <TodoApp
          todoTime={todoTime}
          currentMonthTodos={currentMonthTodos} /> :
        <TodoInit />
      }
    </Block>
  );
};

export default TodoContainer;

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 550px;
  height: 100vh;
  padding: 15px;
  border: 1px solid #2f323b;
  background-color: #242731;
`;