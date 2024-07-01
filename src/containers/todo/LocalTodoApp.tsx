import React, { FC } from 'react';
import styled from '@emotion/styled';
import useTabs from 'Hooks/useTabs';
import TodoTitle from 'Components/todo/TodoTitle';
import TodoInput from 'Components/todo/TodoInput';
import TodoTabs from 'Components/todo/TodoTabs';
import TodoInit from 'Components/todo/TodoInit';
import { createLocalTodos, deleteLocalTodos, shiftLocalTodos } from 'Lib/localTodos';
import LocalTodoList from 'Components/localTodo/LocalTodoList';
import useLocalTodos from 'Hooks/useLocalTodos';
import { useQueryClient } from '@tanstack/react-query';
import { GET_LOCAL_TODOS_LIST_KEY } from 'Lib/queryKeys';

interface LocalTodoAppProps {
  todoTime: string;
};

const LocalTodoApp: FC<LocalTodoAppProps> = ({
  todoTime,
}) => {
  const qc = useQueryClient();
  const [ localTodosData, localTodosRefetch ] = useLocalTodos(todoTime);
  const [ todoTab, onChangeTab ] = useTabs('all');
  
  const addTodo = async (contents: string) => {
    if (!contents || contents.length > 30) return;

    createLocalTodos(
      contents,
      todoTime,
    );
    localTodosRefetch();
    await qc.refetchQueries([GET_LOCAL_TODOS_LIST_KEY]);
  };

  const shiftTodo = async (
    todosId: string,
    isComplete: boolean,
    ) => {
    shiftLocalTodos(
      todosId,
      isComplete,
      todoTime,
    );
    localTodosRefetch();
    await qc.refetchQueries([GET_LOCAL_TODOS_LIST_KEY]);
  };

  const deleteTodo = async (todosId: string) => {
    deleteLocalTodos(
      todosId,
      todoTime,
    );
    localTodosRefetch();
    await qc.refetchQueries([GET_LOCAL_TODOS_LIST_KEY]);
  };

  return (
    <Container>
      {todoTime ?
        <>
        <TodoTitle
          todoTime={todoTime}/>
        <TodoInput
          addTodo={addTodo} />
        <TodoTabs
          todoTab={todoTab}
          onChangeTab={onChangeTab} />
        <LocalTodoList
          todoTab={todoTab}
          todosData={localTodosData}
          shiftTodo={shiftTodo}
          deleteTodo={deleteTodo} />
        </> :
        <TodoInit />}
    </Container>
  );
};

export default LocalTodoApp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 10px;
`;