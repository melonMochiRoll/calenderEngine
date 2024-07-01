import React, { FC } from 'react';
import styled from '@emotion/styled';
import TodoList from 'Components/todo/TodoList';
import TodoTabs from 'Components/todo/TodoTabs';
import TodoInput from 'Components/todo/TodoInput';
import useTabs from 'Hooks/useTabs';
import { useQueryClient } from '@tanstack/react-query';
import { createDateTodos, deleteDateTodos, updateDateTodos } from 'Api/todosApi';
import TodoTitle from 'Components/todo/TodoTitle';
import useTodos from 'Hooks/useTodos';
import TodoInit from 'Components/todo/TodoInit';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';

interface TodoAppProps {
  todoTime: string;
};

const TodoApp: FC<TodoAppProps> = ({
  todoTime,
}) => {
  const qc = useQueryClient();
  const [ todosStatus, todosData, todosDataRefetch ] = useTodos(todoTime);
  const [ todoTab, onChangeTab ] = useTabs('all');

  const addTodo = async (contents: string) => {
    contents.trim();

    if (!contents || contents.length > 30) return;

    await createDateTodos(
      contents,
      todoTime,
    );
    todosDataRefetch();
    await qc.refetchQueries([GET_TODOS_LIST_KEY]);
  };

  const shiftTodo = async (
    todosId: number,
    contents: string,
    isComplete: boolean,
    ) => {

    await updateDateTodos(
      todosId,
      contents,
      isComplete,
      todoTime,
    );
    todosDataRefetch();
    await qc.refetchQueries([GET_TODOS_LIST_KEY]);
  };

  const deleteTodo = async (todosId: number) => {
    await deleteDateTodos(
      todosId,
      todoTime,
    );
    todosDataRefetch();
    await qc.refetchQueries([GET_TODOS_LIST_KEY]);
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
        <TodoList
          todoTab={todoTab}
          todosStatus={todosStatus}
          todosData={todosData}
          shiftTodo={shiftTodo}
          deleteTodo={deleteTodo} />
        </> :
        <TodoInit />
      }
    </Container>
  );
};

export default TodoApp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 10px;
`;