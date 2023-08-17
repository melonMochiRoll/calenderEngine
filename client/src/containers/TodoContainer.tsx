import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoApp from './todo/TodoApp';
import TodoInit from 'Components/todo/TodoInit';
import { currentMonthTodosType } from 'Pages/MainPage';

interface TodoContainerProps {
  currentTime: string;
  currentMonthTodos: currentMonthTodosType;
  setCurrentMonthTodos: React.Dispatch<React.SetStateAction<currentMonthTodosType>>;
};

const TodoContainer: FC<TodoContainerProps> = ({
  currentTime,
  currentMonthTodos,
  setCurrentMonthTodos,
}) => {
  return (
    <Block>
      {currentTime ?
        <TodoApp
          currentTime={currentTime}
          currentMonthTodos={currentMonthTodos}
          setCurrentMonthTodos={setCurrentMonthTodos} /> :
        <TodoInit />
      }
    </Block>
  );
};

export default TodoContainer;

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 650px;
  height: 100vh;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
`;